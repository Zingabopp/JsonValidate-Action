import * as core from '@actions/core'
import * as SchemaTools from '../src/SchemaTools'

describe('Get draft-04 from identifier', () => {
  it('Returns draft-04 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier = 'https://json-schema.org/draft-04/schema#'
    const expectedId = 'https://json-schema.org/draft-04/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const metaschema = SchemaTools.GetBuiltinSchema(identifier, localDrafts)[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-04 from use-draft: draft-04', () => {
  it('Returns draft-04 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier = 'draft-04'
    const expectedId = 'https://json-schema.org/draft-04/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const metaschema = SchemaTools.GetBuiltinSchema(identifier, localDrafts)[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-06 from identifier', () => {
  it('Returns draft-06 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier = 'https://json-schema.org/draft-06/schema#'
    const expectedId = 'https://json-schema.org/draft-06/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const metaschema = SchemaTools.GetBuiltinSchema(identifier, localDrafts)[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-06 from use-draft: draft-06', () => {
  it('Returns draft-06 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier = 'draft-06'
    const expectedId = 'https://json-schema.org/draft-06/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const metaschema = SchemaTools.GetBuiltinSchema(identifier, localDrafts)[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-07 from identifier', () => {
  it('Returns draft-07 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier = 'https://json-schema.org/draft-07/schema#'
    const expectedId = 'https://json-schema.org/draft-07/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const metaschema = SchemaTools.GetBuiltinSchema(identifier, localDrafts)[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})

describe('Get draft-07 from use-draft: draft-07', () => {
  it('Returns draft-07 schema', async () => {
    process.env['TEST_ENVIRONMENT'] = 'true'
    const identifier = 'draft-07'
    const expectedId = 'https://json-schema.org/draft-07/schema#'
    const localDrafts = `${__dirname}/../dist/drafts`
    const metaschema = SchemaTools.GetBuiltinSchema(identifier, localDrafts)[0]
    const metaschemaId = SchemaTools.GetSchemaId(metaschema)
    expect(metaschemaId).toEqual(expectedId)
  })
})
