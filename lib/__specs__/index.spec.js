const { RuleTester } = require('eslint');
const { rules } = require('../');
const methods = require('../rules/methods.json');
const { ruleName: noImportRuleName } = require('../rules/utils/no-import');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleTester = new RuleTester();

const methodKeys = Object.keys(methods);

describe('ESLint you-dont-need-recompose plugin', () => {
  const directImport = methodKeys.map(method => {
    const ruleName = noImportRuleName(method);
    return [method, ruleName, methods[method].message, rules[ruleName]];
  });

  describe.each(directImport)(
    'deprecates recompose/%s ',
    (method, ruleName, errorMessage, rule) => {
      ruleTester.run(ruleName, rule, {
        valid: ["import React from 'react'"],
        invalid: [
          {
            code: `import ${method} from 'recompose/${method}';`,
            errors: [
              {
                message: errorMessage,
                type: 'ImportDeclaration',
              },
            ],
          },
        ],
      });
    },
  );
});
