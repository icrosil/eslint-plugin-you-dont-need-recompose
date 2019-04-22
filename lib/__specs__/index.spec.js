const { RuleTester } = require('eslint');
const { rules } = require('../');
const methods = require('../rules/methods');
const { ruleName: noImportRuleName } = require('../rules/utils/no-import');
const {
  ruleName: noDynamicImportRuleName,
} = require('../rules/utils/no-dynamic-import');
const {
  ruleName: noDynamicImportRecomposeRuleName,
  message: noDynamicImportRecomposeMessage,
  rule: noDynamicImportRecomposeRule,
} = require('../rules/no-dynamic-import-recompose');
const { ruleName: noRequireRuleName } = require('../rules/utils/no-require');
// TODO: try to have less imports

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
  // Direct import
  const directImport = methodKeys.map(method => {
    const ruleName = noImportRuleName(method);
    return [method, ruleName, methods[method].message, rules[ruleName]];
  });

  describe.each(directImport)(
    'deprecates direct import recompose/%s ',
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
            code: `import { abc, ${method}, def } from 'recompose';`,
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

  // Dynamic recompose
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

  // Dynamic methods
  const dynamicImport = methodKeys.map(method => {
    const ruleName = noDynamicImportRuleName(method);
    return [method, ruleName, methods[method].message, rules[ruleName]];
  });
  describe.each(dynamicImport)(
    'deprecates dynamic import recompose/%s ',
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

  // require
  const requireImport = methodKeys.map(method => {
    const ruleName = noRequireRuleName(method);
    return [method, ruleName, methods[method].message, rules[ruleName]];
  });
  describe.each(requireImport)(
    'deprecates require recompose/%s ',
    (method, ruleName, errorMessage, rule) => {
      ruleTester.run(ruleName, rule, {
        valid: ["const module = require('module');"],
        invalid: [
          {
            code: `const ${method} = require('recompose/${method}')`,
            errors: [
              {
                message: errorMessage,
                type: 'CallExpression',
              },
            ],
          },
          {
            code: `const { ${method} } = require('recompose')`,
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
