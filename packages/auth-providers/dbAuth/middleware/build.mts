import { buildExternalCjs, buildExternalEsm } from '@redmix/framework-tools'
import {
  generateTypesCjs,
  generateTypesEsm,
  insertCommonJsPackageJson,
} from '@redmix/framework-tools/generateTypes'

await buildExternalEsm()
await generateTypesEsm()

await buildExternalCjs()
await generateTypesCjs()

await insertCommonJsPackageJson({ buildFileUrl: import.meta.url })
