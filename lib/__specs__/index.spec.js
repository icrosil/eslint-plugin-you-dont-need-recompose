const { RuleTester } = require('eslint');
const { rules } = require('../');
const methods = require('../rules/methods.json');
const { ruleName: noImportRuleName } = require('../rules/utils/no-import');
const {
  ruleName: noDynamicImportRuleName,
} = require('../rules/utils/no-dynamic-import');
const {
  ruleName: noDynamicImportRecomposeRuleName,
  message: noDynamicImportRecomposeMessage,
  rule: noDynamicImportRecomposeRule,
} = require('../rules/no-dynamic-import-recompose');

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
  ruleTester.run(
    noDynamicImportRecomposeRuleName(),
    noDynamicImportRecomposeRule,
    {
      valid: ["import('module')"],
      invalid: [
        {
          code: `import('recompose').then(()=>{})`,
          errors: [
            {
              message: noDynamicImportRecomposeMessage,
              type: 'CallExpression',
            },
          ],
        },
        {
          code: `(async () => { const m = await import('recompose'); })()`,
          errors: [
            {
              message: noDynamicImportRecomposeMessage,
              type: 'CallExpression',
            },
          ],
        },
      ],
    },
  );
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
          {
            code: `import { ${method} } from 'recompose';`,
            errors: [
              {
                message: errorMessage,
                type: 'ImportDeclaration',
              },
            ],
          },
          {
            code: `import { withProps, ${method}, mapProps } from 'recompose';`,
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

  const dynamicImport = methodKeys.map(method => {
    const ruleName = noDynamicImportRuleName(method);
    return [method, ruleName, methods[method].message, rules[ruleName]];
  });
  describe.each(dynamicImport)(
    'deprecates recompose/%s ',
    (method, ruleName, errorMessage, rule) => {
      ruleTester.run(ruleName, rule, {
        valid: ["import('module')"],
        invalid: [
          {
            code: `import('recompose/${method}').then(()=>{})`,
            errors: [
              {
                message: errorMessage,
                type: 'CallExpression',
              },
            ],
          },
          {
            code: `(async () => { const m = await import('recompose/${method}'); })()`,
            errors: [
              {
                message: errorMessage,
                type: 'CallExpression',
              },
            ],
          },
        ],
      });
    },
  );
});
