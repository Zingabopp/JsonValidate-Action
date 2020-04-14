import * as core from '@actions/core'
import fetch from 'cross-fetch'
import fs from 'fs'

/**
 * Returns the schema object for metaschemas bundled in this project.
 * @param identifier - Identifier of the metaschema, can be in the form draft-xx or the full url to the json-schema.org schema.
 * @param localSchemaDir - The directory where the local metaschemas are stored.
 * @returns The schema object if found, undefined if not.
 * @throws Error
 */
export function GetBuiltinSchema(
  identifier: string | undefined,
  localSchemaDir: string
): Schema[] {
  const schemas: Schema[] = []
  if (identifier === undefined || identifier === '') {
    return schemas
  }
  if (
    identifier === 'draft-04' ||
    identifier.includes('json-schema.org/draft-04/schema')
  ) {
    schemas.push(
      JSON.parse(
        fs.readFileSync(`${localSchemaDir}/json-schema-draft-04.json`, 'utf8')
      )
    )
  } else if (
    identifier === 'draft-06' ||
    identifier.includes('json-schema.org/draft-06/schema')
  ) {
    schemas.push(
      JSON.parse(
        fs.readFileSync(`${localSchemaDir}/json-schema-draft-06.json`, 'utf8')
      )
    )
  } else if (
    identifier === 'draft-07' ||
    identifier.includes('json-schema.org/draft-07/schema')
  ) {
    schemas.push(
      JSON.parse(
        fs.readFileSync(`${localSchemaDir}/json-schema-draft-07.json`, 'utf8')
      )
    )
  } else if (
    identifier === 'draft-2019-09' ||
    identifier.includes('json-schema.org/draft/2019-09/schema')
  ) {
    throw Error(
      'Unable to use this schema, Draft 2019-09 is not supported by AJV.'
    )

    /*
    const schemaNames: string[] = [
      'meta/core',
      'meta/applicator',
      'meta/validation',
      'meta/meta-data',
      'meta/format',
      'meta/content',
      'schema'
    ]
    for (const element of schemaNames) {
      schemas.push(
        JSON.parse(
          fs.readFileSync(`${localSchemaDir}/2019-09/${element}`, 'utf8')
        )
      )
    }
    */
  }
  return schemas
}
export interface Schema {
  $schema: string | undefined
  $id: string | undefined
  id: string | undefined
}
export async function GetMetaSchemasForSchema(
  schema: Schema,
  localSchemaPath: string,
  allowOnlineFetch: boolean = false,
  draftSpec: string | undefined = undefined
): Promise<Schema[]> {
  let metaschemas: Schema[] = GetBuiltinSchema(draftSpec, localSchemaPath)
  const schemaSchema = schema.$schema
  if (metaschemas.length === 0) {
    if (schemaSchema !== undefined && schemaSchema.length > 0) {
      if (draftSpec !== undefined && draftSpec.length > 0) {
        core.warning(`Invalid value for 'use-draft': ${draftSpec}`)
      }
      metaschemas = GetBuiltinSchema(schemaSchema, localSchemaPath)
      if (metaschemas.length === 0 && allowOnlineFetch) {
        // Disabled for security concerns
        try {
          core.info(`Attempting to download MetaSchema from ${schemaSchema}...`)
          metaschemas.push(await FetchSchema(schemaSchema))
        } catch (error) {
          core.warning(`Unable to download MetaSchema: ${error.message}`)
        }
      }
    } else {
      core.warning('No MetaSchema found, AJV will use Draft-07.')
    }
  }
  return metaschemas
}

export async function FetchSchema(url: string): Promise<Schema> {
  const resp = await fetch(url)
  if (resp.status >= 400) {
    throw new Error(
      `Unable to get schema from ${url}: ${resp.status} - ${resp.statusText}`
    )
  }
  return resp.json()
}

export function GetSchemaId(schema: Schema | undefined): string | undefined {
  if (schema === undefined) {
    return undefined
  }
  let schemaId = schema.$id
  if (schemaId === undefined) {
    schemaId = schema.id
  }
  return schemaId
}
