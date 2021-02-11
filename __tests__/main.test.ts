import * as core from '@actions/core'
import run from '../src/main'

describe('Use schema from file', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    const schemaInput = './ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput

    process.env['TEST_ENVIRONMENT'] = 'true'
    const infoMock = jest.spyOn(core, 'info')
    const failedMock = jest.spyOn(core, 'setFailed')
    await run()
    expect(failedMock).toHaveBeenCalledTimes(0)
    expect(infoMock).toHaveBeenCalledWith('JSON is valid!')
    expect(infoMock).toHaveBeenCalledWith(
      `Using schema at '${__dirname}/${schemaInput}'`
    )
  })
})

describe('Use schema from online fetch', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    process.env['TEST_ENVIRONMENT'] = 'true'
    process.env['TEST_ONLINE_FETCH'] = 'true'
    const infoMock = jest.spyOn(core, 'info')
    const failedMock = jest.spyOn(core, 'setFailed')
    await run()
    expect(failedMock).toHaveBeenCalledTimes(0)
    expect(infoMock).toHaveBeenCalledWith('JSON is valid!')
  })
})

describe('Use schema from http source', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    const schemaInput =
      'https://raw.githubusercontent.com/Zingabopp/BeatSaberMultiplayerServerRepo/master/ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput
    process.env['TEST_ENVIRONMENT'] = 'true'
    const infoMock = jest.spyOn(core, 'info')
    const failedMock = jest.spyOn(core, 'setFailed')
    await run()
    expect(failedMock).toHaveBeenCalledTimes(0)
    expect(infoMock).toHaveBeenCalledWith('JSON is valid!')
    expect(infoMock).toHaveBeenCalledWith(
      `Fetching schema from '${schemaInput}'`
    )
  })
})

describe('Allow online fetch enabled', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    process.env['TEST_ONLINE_FETCH'] = 'true'
    const schemaInput =
      'https://raw.githubusercontent.com/Zingabopp/BeatSaberMultiplayerServerRepo/master/ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput
    process.env['TEST_ENVIRONMENT'] = 'true'
    const debugMock = jest.spyOn(core, 'debug')
    const infoMock = jest.spyOn(core, 'info')
    const warnMock = jest.spyOn(core, 'warning')
    await run()
    expect(debugMock).toHaveBeenCalledWith(`allowOnlineFetch:true`)
    expect(warnMock).toHaveBeenCalledTimes(0)
    expect(infoMock).toHaveBeenCalledWith('Online schema fetch is enabled.')
  })
})
describe('Allow online fetch disabled', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    process.env['TEST_ONLINE_FETCH'] = 'false'
    const schemaInput =
      'https://raw.githubusercontent.com/Zingabopp/BeatSaberMultiplayerServerRepo/master/ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput
    process.env['TEST_ENVIRONMENT'] = 'true'
    const debugMock = jest.spyOn(core, 'debug')
    const warnMock = jest.spyOn(core, 'warning')
    await run()
    expect(debugMock).toHaveBeenCalledWith(`allowOnlineFetch:false`)
    expect(warnMock).toHaveBeenCalledTimes(0)
  })
})

describe('Allow online fetch invalid input', () => {
  it('outputs a debug message', async () => {
    process.env['GITHUB_WORKSPACE'] = __dirname
    process.env['TEST_ONLINE_FETCH'] = 'trasdfue'
    const schemaInput =
      'https://raw.githubusercontent.com/Zingabopp/BeatSaberMultiplayerServerRepo/master/ServerRepositorySchema.json'
    process.env['TEST_SCHEMA_INPUT'] = schemaInput
    process.env['TEST_ENVIRONMENT'] = 'true'
    const debugMock = jest.spyOn(core, 'debug')
    const warnMock = jest.spyOn(core, 'warning')
    await run()
    expect(debugMock).toHaveBeenCalledWith(`allowOnlineFetch:false`)
    expect(warnMock).toHaveBeenCalledWith(
      `'allow-online-fetch' input of 'trasdfue' is invalid.`
    )
  })
})
