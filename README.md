# JsonValidate<a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
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
## Development

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run pack
```
