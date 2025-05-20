import fs from 'fs'
import path from 'path'

import * as esbuild from 'esbuild'

import {
  getWebSideDefaultBabelConfig,
  registerApiSideBabelHook,
} from '@cedarjs/babel-config'
import { getPaths } from '@cedarjs/project-config'

export async function runScriptFunction({
  path: scriptPath,
  functionName = 'default',
  args,
}) {
  // Configure babel with the same settings as before
  configureBabel()
  
  // Read the source file
  const source = fs.readFileSync(scriptPath, 'utf-8')
  const fileExtension = path.extname(scriptPath)
  
  // Get paths configuration
  const projectRoot = path.dirname(getPaths().base)
  const paths = getPaths()
  
  // Use a temporary file with .mjs extension to ensure ESM compatibility
  const tempDir = path.dirname(scriptPath)
  const tempFilename = `__temp_${Date.now()}.mjs`
  const tempFilePath = path.join(tempDir, tempFilename)
  
  try {
    // Use esbuild to bundle the script
    await esbuild.build({
      stdin: {
        contents: source,
        loader: fileExtension.replace('.', ''),
        resolveDir: path.dirname(scriptPath),
        sourcefile: scriptPath,
      },
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node16',
      absWorkingDir: projectRoot,
      outfile: tempFilePath,
      external: ['*'],
      sourcemap: 'inline',
      logLevel: 'error',
      plugins: [
        {
          name: 'redwood-path-resolver',
          setup(build) {
            // Custom resolver for redwood-specific imports
            build.onResolve({ filter: /^(api|web)(\/|$)/ }, args => {
              const match = args.path.match(/^(api|web)(\/|$)/)
              if (!match) {
                return null
              }
              
              const side = match[1] // 'api' or 'web'
              const restOfPath = args.path.slice(side.length + (match[2] === '/' ? 1 : 0))
              
              // Convert .js extension to .ts if needed (or other appropriate extensions)
              let fullPath = path.join(
                side === 'api' ? paths.api.base : paths.web.base, 
                restOfPath
              )
              
              // If the path has a .js extension, check if a corresponding .ts file exists
              if (path.extname(fullPath) === '.js') {
                const tsPath = fullPath.replace(/\.js$/, '.ts')
                const tsxPath = fullPath.replace(/\.js$/, '.tsx')
                
                if (fs.existsSync(tsPath)) {
                  return { path: tsPath }
                } else if (fs.existsSync(tsxPath)) {
                  return { path: tsxPath }
                }
              }
              
              return { path: fullPath }
            })
            
            // Handle local imports with .js extension
            build.onResolve({ filter: /\.js$/ }, args => {
              // Skip node_modules
              if (args.path.includes('node_modules')) {
                return null
              }
              
              // Handle relative imports
              if (args.path.startsWith('.')) {
                const resolvedPath = path.resolve(args.resolveDir, args.path)
                const tsPath = resolvedPath.replace(/\.js$/, '.ts')
                const tsxPath = resolvedPath.replace(/\.js$/, '.tsx')
                
                if (fs.existsSync(tsPath)) {
                  return { path: tsPath }
                } else if (fs.existsSync(tsxPath)) {
                  return { path: tsxPath }
                }
              }
              
              return null
            })
          }
        }
      ],
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    })
    
    // Import the transpiled module (using dynamic import for ESM compatibility)
    const module = await import(`file://${path.resolve(tempFilePath)}`)
    
    // Get the exported function (handle both named and default exports)
    let exportedFunction
    if (typeof module[functionName] === 'function') {
      exportedFunction = module[functionName]
    } else if (functionName === 'default' && typeof module.default === 'function') {
      exportedFunction = module.default
    } else {
      throw new Error(`Function '${functionName}' not found in '${scriptPath}'`)
    }
    
    // Execute the function
    const returnValue = await exportedFunction(args)
    
    // Clean up database connections if they exist
    try {
      // Try to close db connection via dynamic ESM import first
      try {
        // Try a few potential paths for db
        const dbPathOptions = [
          path.join(paths.api.lib, 'db'),
          path.join(paths.api.src, 'lib', 'db')
        ]
        
        for (const dbPath of dbPathOptions) {
          try {
            // Attempt to dynamically import the db module
            const dbModule = await import(`file://${path.resolve(dbPath)}`)
            
            if (dbModule.db && typeof dbModule.db.$disconnect === 'function') {
              await dbModule.db.$disconnect()
              break
            } else if (dbModule.default?.db && typeof dbModule.default.db.$disconnect === 'function') {
              await dbModule.default.db.$disconnect()
              break
            }
          } catch (e) {
            // Continue to next path
          }
        }
      } catch (e) {
        // Silent failure for DB disconnect
      }
    } catch (e) {
      // Silently handle database disconnection errors
    }
    
    return returnValue
  } catch (error) {
    console.error(`Error details: ${error.message}`)
    if (error.message.includes('Could not resolve')) {
      throw new Error(`Error bundling '${scriptPath}': ${error.message}. Make sure all imports are available.`)
    } else if (error.message.includes('Cannot find module')) {
      throw new Error(`Error executing '${scriptPath}': ${error.message}. Check if the TypeScript file exists with a .ts extension when importing .js.`)
    } else if (error.message.includes('Cannot read file')) {
      throw new Error(`Error executing '${scriptPath}': ${error.message}. Check if TypeScript file exists at the correct location.`)
    } else {
      throw new Error(`Error executing '${scriptPath}': ${error.message}`)
    }
  } finally {
    // Clean up the temporary file
    try {
      // Give a small delay to ensure file is not in use
      await new Promise(resolve => setTimeout(resolve, 200))
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath)
      } else {
        console.warn(`Temp file not found during cleanup: ${tempFilePath}`)
      }
    } catch (cleanupError) {
      // Silently handle cleanup errors
      console.warn(`Warning: Could not clean up temporary file: ${tempFilePath}`)
    }
  }
}

export function configureBabel() {
  const {
    overrides: _overrides,
    plugins: webPlugins,
    ...otherWebConfig
  } = getWebSideDefaultBabelConfig()

  // Import babel config for running script
  registerApiSideBabelHook({
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          alias: {
            $api: getPaths().api.base,
            $web: getPaths().web.base,
            api: getPaths().api.base,
            web: getPaths().web.base,
          },
          loglevel: 'silent', // to silence the unnecessary warnings
        },
        'exec-$side-module-resolver',
      ],
    ],
    overrides: [
      {
        test: ['./api/'],
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              alias: {
                src: getPaths().api.src,
              },
              loglevel: 'silent',
            },
            'exec-api-src-module-resolver',
          ],
        ],
      },
      {
        test: ['./web/'],
        plugins: [
          ...webPlugins,
          [
            'babel-plugin-module-resolver',
            {
              alias: {
                src: getPaths().web.src,
              },
              loglevel: 'silent',
            },
            'exec-web-src-module-resolver',
          ],
        ],
        ...otherWebConfig,
      },
    ],
  })
}