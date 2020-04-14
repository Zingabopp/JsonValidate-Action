import * as core from '@actions/core'
import fs from 'fs'
import Ajv from 'ajv'
import * as schemaTools from './SchemaTools'

async function run(): Promise<void> {
  try {
    const fullpath = process.env['GITHUB_WORKSPACE'] as string

    core.debug(`Workspace path is ${fullpath}`)
    core.debug(`Action local path is ${__dirname}`)
    const localSchemaPath = `${__dirname}/../dist/drafts`
    // Get Inputs
    let schemaInput: string | undefined = core.getInput('json-schema')
    let jsonInput: string | undefined = core.getInput('json-file')
    const draftSpec: string | undefined = core.getInput('use-draft')
    let invalidInput = false
    let schemaPath = ''
    if (process.env['TEST_ENVIRONMENT'] === 'true') {
      core.info('Testing environment detected.')
      schemaInput = process.env['TEST_SCHEMA_INPUT']
      jsonInput = './CompatibleServers.json'
    }
    if (schemaInput === undefined || schemaInput.length === 0) {
      core.error('A schema file must be provided for the json.')
      invalidInput = true
    }
    if (jsonInput === undefined || jsonInput.length === 0) {
      core.error('A json file to validate must be provided.')
      invalidInput = true
    }
    if (invalidInput) {
      throw Error('Unable to validate json file due to invalid input.')
    }
    const allowOnlineFetch = false

    let jsonPath = jsonInput
    core.info(`  json-schema: ${schemaInput}`)
    core.info(`  json-file: ${jsonPath}`)
    core.info(`  use-draft: ${draftSpec}`)
    jsonPath = `${fullpath}/${jsonInput}`
    let schema = undefined
    if (schemaInput !== undefined && (schemaInput.startsWith('https://') || schemaInput.startsWith('http://'))) {
      schemaPath = schemaInput
      core.info(`Fetching schema from '${schemaPath}'`)
      schema = await schemaTools.FetchSchema(schemaPath)
    } else {
      schemaPath = `${fullpath}/${schemaInput}`
      core.info(`Using schema at '${schemaPath}'`)
      const schemaString = fs.readFileSync(schemaPath, 'utf8')
      schema = JSON.parse(schemaString)
    }

    const jsonString = fs.readFileSync(jsonPath, 'utf8')
    const jsonFileObject = JSON.parse(jsonString)

    const metaschemas: schemaTools.Schema[] = await schemaTools.GetMetaSchemasForSchema(
      schema,
      localSchemaPath,
      allowOnlineFetch,
      draftSpec
    )

    const ajv = new Ajv({schemaId: 'auto', allErrors: true})
    core.info(`${metaschemas.length} MetaSchemas to add to AJV.`)
    for (const element of metaschemas) {
      const metaschemaId = schemaTools.GetSchemaId(element)
      core.info(`  Adding MetaSchema ${metaschemaId} to AJV.`)
      ajv.addMetaSchema(element)
    }
    core.info('Compiling ajv validator...')
    const validate = ajv.compile(schema)
    core.info('Validating json file...')
    const valid = validate(jsonFileObject)
    if (valid) {
      core.info('JSON is valid!')
    } else {
      core.setFailed(`JSON is invalid: ${ajv.errorsText(validate.errors)}`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

export default run
