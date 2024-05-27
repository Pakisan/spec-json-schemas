import TestHelper from '@test/test-helper';

const fs = require('fs');
const assert = require('assert');
const title = 'Channel'
const validator = TestHelper.validator(require('@bindings/pulsar/0.1.0/channel.json'))

describe(`${title}`, () => {
  it('example', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, `Example MUST be valid`);
  });

  it('empty', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'Is not valid with empty body');
    assert(validator.errors[0].message === 'must have required property \'namespace\'');
    assert(validator.errors[1].message === 'must have required property \'persistence\'');
    assert(validator.errors.length === 2);
  });

  it('without required properties', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'Is not valid without required properties.');
    assert(validator.errors[0].message === 'must have required property \'namespace\'');
    assert(validator.errors[1].message === 'must have required property \'persistence\'');
    assert(validator.errors.length === 2);
  });

  it('only required properties', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'Is valid with only required properties.');
  });

  it('extended', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'Can be extended');
  });

  it('wrongly extended', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'Unknown extension are not supported');
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
