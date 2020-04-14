import * as core from '@actions/core'
import * as SchemaTools from '../src/SchemaTools'

describe('Get draft-04 from $schema', () => {
  it('Returns draft-04 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier: string = 'https://json-schema.org/draft-04/schema#'
    const expectedId = 'https://json-schema.org/draft-04/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const draftSpec = undefined
    const schema: SchemaTools.Schema = {
      $schema: identifier,
      $id: 'https://test.com/schema#',
      id: undefined
    }
    const metaschema = (
      await SchemaTools.GetMetaSchemasForSchema(
        schema,
        localDrafts,
        false,
        draftSpec
      )
    )[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-06 from $schema that uses http://', () => {
  it('Returns draft-06 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier: string = 'http://json-schema.org/draft-06/schema#'
    const expectedId = 'https://json-schema.org/draft-06/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const draftSpec = undefined
    const schema: SchemaTools.Schema = {
      $schema: identifier,
      $id: 'https://test.com/schema#',
      id: undefined
    }
    const metaschema = (
      await SchemaTools.GetMetaSchemasForSchema(
        schema,
        localDrafts,
        false,
        draftSpec
      )
    )[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-06 from use-draft when $schema is draft-07', () => {
  it('Returns draft-06 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier: string = 'http://json-schema.org/draft-07/schema#'
    const expectedId = 'https://json-schema.org/draft-06/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const draftSpec = 'draft-06'
    const schema: SchemaTools.Schema = {
      $schema: identifier,
      $id: 'https://test.com/schema#',
      id: undefined
    }
    const metaschema = (
      await SchemaTools.GetMetaSchemasForSchema(
        schema,
        localDrafts,
        false,
        draftSpec
      )
    )[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-07 from $schema when use-draft has invalid value', () => {
  it('Returns draft-06 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier: string = 'http://json-schema.org/draft-07/schema#'
    const expectedId = 'https://json-schema.org/draft-07/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const draftSpec = 'draft-01'
    const warnMock = jest.spyOn(core, 'warning')
    const schema: SchemaTools.Schema = {
      $schema: identifier,
      $id: 'https://test.com/schema#',
      id: undefined
    }
    const metaschema = (
      await SchemaTools.GetMetaSchemasForSchema(
        schema,
        localDrafts,
        false,
        draftSpec
      )
    )[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
    expect(warnMock).toHaveBeenCalledWith(
      `Invalid value for 'use-draft': ${draftSpec}`
    )
  })
})
