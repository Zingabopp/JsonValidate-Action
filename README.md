<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# JsonValidate
A TypeScript GitHub Action that validates a JSON file against a schema using [AJV](https://github.com/epoberezkin/ajv).

The schema must use Draft-04, Draft-06, or Draft-07 from [json-schema.org](https://json-schema.org/) as their meta-schema.


# Usage
The 'json-schema' path can either be a file path in your repository or a URL that starts with 'http://' or 'https://'.
```yaml
uses: Zingabopp/JsonValidate-Action@v1
with:
  json-schema: Path/To/Your/Schema.json
  json-file: Path/To/Your/JsonFile.json
```
```yaml
uses: Zingabopp/JsonValidate-Action@v1
with:
  json-schema: https://example.com/schema.json
  json-file: Path/To/Your/JsonFile.json
```
If the schema doesn't provide the MetaSchema ($schema property), you can specify which one AJV should load using 'use-draft'. The options are 'draft-04', 'draft-06', and 'draft-07'.
```yaml
uses: Zingabopp/JsonValidate-Action@v1
with:
  json-schema: https://example.com/schema.json
  json-file: Path/To/Your/JsonFile.json
  use-draft: draft-06
```
## Code in Master

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run pack
```

## Change action.yml

The action.yml contains defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try { 
      ...
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run pack
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml)])

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
