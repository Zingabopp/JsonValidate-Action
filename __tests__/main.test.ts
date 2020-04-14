import * as core from '@actions/core'
import run from '../src/main'

describe('Use schema from file', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    const schemaInput = './ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput

    process.env['TEST_ENVIRONMENT'] = 'true'
    const debugMock = jest.spyOn(core, 'info')
    await run()
    expect(debugMock).toHaveBeenCalledWith('JSON is valid!')
    expect(debugMock).toHaveBeenCalledWith(
      `Using schema at '${__dirname}/${schemaInput}'`
    )
  })
})

describe('Use schema from http source', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    const schemaInput =
      'https://raw.githubusercontent.com/Zingabopp/BeatSaberMultiplayerServerRepo/master/ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput
    process.env['TEST_ENVIRONMENT'] = 'true'
    const debugMock = jest.spyOn(core, 'info')
    await run()
    expect(debugMock).toHaveBeenCalledWith('JSON is valid!')
    expect(debugMock).toHaveBeenCalledWith(
      `Fetching schema from '${schemaInput}'`
    )
  })
})
