import { buildCjs, buildEsm } from '@redmix/framework-tools'
import {
  generateTypesCjs,
  generateTypesEsm,
  insertCommonJsPackageJson,
} from '@redmix/framework-tools/generateTypes'

await buildEsm()
await generateTypesEsm()

await buildCjs()
await generateTypesCjs()

await insertCommonJsPackageJson({ buildFileUrl: import.meta.url })
