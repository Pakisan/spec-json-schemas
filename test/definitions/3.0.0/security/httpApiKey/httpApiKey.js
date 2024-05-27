const Ajv = require('ajv');
const assert = require('assert');
const addFormats = require('ajv-formats');
const fs = require('fs');

const ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
  schemaId: '$id',
  logger: false,
  validateFormats: true,
  strict: false,
});
addFormats(ajv);

const jsonSchemaName = 'HTTP API Key';
const jsonSchema = require('@definitions/3.0.0/APIKeyHTTPSecurityScheme.json');
const validator = ajv
  .addMetaSchema(require('@definitions/3.0.0/schema.json'))
  .addSchema(require('@definitions/3.0.0/specificationExtension.json'))
  .compile(jsonSchema);

describe('HTTP API Key', () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${jsonSchemaName} example MUST be valid`);
  });

  it('empty', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'HTTP API Key with empty body is not valid');
    assert(validator.errors[0].message === 'must have required property \'type\'');
    assert(validator.errors[1].message === 'must have required property \'name\'');
    assert(validator.errors[2].message === 'must have required property \'in\'');
    assert(validator.errors.length === 3);
  });

  it('without required properties', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'HTTP API Key without required properties is not valid');
    assert(validator.errors[0].message === 'must have required property \'type\'');
    assert(validator.errors[1].message === 'must have required property \'name\'');
    assert(validator.errors[2].message === 'must have required property \'in\'');
    assert(validator.errors.length === 3);
  });

  it('only required properties', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid with only required properties');
  });

  it('extended', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key can be extended');
  });

  it('wrongly extended', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'HTTP API Key is not valid when was wrongly extended');
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});