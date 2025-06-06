import fs from 'fs'
import path from 'path'

import { getDMMF, getSchema } from '@prisma/internals'
import * as esbuild from 'esbuild'

import { getPaths } from '@cedarjs/project-config'

const DATAMODEL_PATH = path.join(getPaths().api.models, 'datamodel.js')
const MODELS_PATH = path.join(getPaths().api.src, 'models')
const MODELS_INDEX_PATH = path.join(MODELS_PATH, 'index.js')

const indexLines = [
  '// This file is autogenerated by Redwood and will be overwritten periodically',
  '',
  "import { db } from 'src/lib/db'",
  "import datamodel from 'src/models/datamodel'",
  "import { RedwoodRecord } from '@cedarjs/record'",
  '',
  'RedwoodRecord.db = db',
  'RedwoodRecord.schema = datamodel',
  '',
]

const modelImports = []
const modelRequires = {}
let datamodel

// parse datamodel and write out cache
export const parseDatamodel = () => {
  const schema = getSchema(getPaths().api.dbSchema)

  getDMMF({ datamodel: schema }).then((schema) => {
    datamodel = schema.datamodel

    try {
      // Ensure the directory exists
      const dir = path.dirname(DATAMODEL_PATH)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(
        DATAMODEL_PATH,
        esbuild.transformSync(JSON.stringify(datamodel, null, 2), {
          loader: 'json',
          format: 'cjs',
        }).code,
      )
      console.info(`\n  Wrote ${DATAMODEL_PATH}`)
    } catch (e) {
      console.error('Error writing datamodel to', DATAMODEL_PATH)
    }

    // figure out what model classes are present
    const modelNames = fs
      .readdirSync(MODELS_PATH)
      .map((file) => {
        if (file !== 'index.js' && file !== 'datamodel.js') {
          return file.split('.')[0]
        }
      })
      .filter((val) => val)

    if (modelNames.length === 0) {
      console.warn('No models found in', MODELS_PATH)
      console.warn(
        'Please create a model to represent the database table you want to access.',
      )
      return
    }

    modelNames.forEach((modelName) => {
      // which other models this model requires
      const thisModelRequires = []

      // import statements
      modelImports.push(`import ${modelName} from 'src/models/${modelName}'`)

      // requireModel declarations
      const schemaModel = datamodel.models.find(
        (model) => model.name === modelName,
      )

      if (schemaModel) {
        schemaModel.fields.forEach((field) => {
          if (field.kind === 'object' && modelNames.includes(field.type)) {
            thisModelRequires.push(field.type)
          }
        })
        modelRequires[modelName] = thisModelRequires
      }
    })

    modelImports.forEach((modelImport) => {
      indexLines.push(modelImport)
    })

    indexLines.push('')

    for (const [name, requires] of Object.entries(modelRequires)) {
      indexLines.push(`${name}.requiredModels = [${requires.join(', ')}]`)
    }

    indexLines.push('')
    indexLines.push(`export { ${modelNames.join(', ')} }`)
    indexLines.push('') // empty newline at end

    fs.writeFileSync(MODELS_INDEX_PATH, indexLines.join('\n'))
    console.info(`  Wrote ${MODELS_INDEX_PATH}\n`)
  })
}
