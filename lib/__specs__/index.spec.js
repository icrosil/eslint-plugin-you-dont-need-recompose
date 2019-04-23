const { RuleTester } = require('eslint');
const { rules } = require('../');
const methods = require('../rules/methods');
const { ruleName: noImportRuleName } = require('../rules/utils/no-any-import');
const noRecompose = require('../rules/no-recompose');

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

  ruleTester.run(noRecompose.ruleName(), noRecompose.rule, {
    valid: [
      "import React from 'react'",
      "const React = require('react');",
      "import('React')",
    ],
    invalid: [
      {
        code: `import somecompose from 'recompose';`,
        errors: [
          {
            message: noRecompose.message,
            type: 'ImportDeclaration',
          },
        ],
      },
      {
        code: `import somecompose from 'recompose';`,
        errors: [
          {
            message: noRecompose.message,
            type: 'ImportDeclaration',
          },
        ],
      },
      {
        code: `const somecompose = require('recompose');`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `import('recompose').then(()=>{})`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `(async () => { const m = await import('recompose'); })()`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `import withState from 'recompose/withState';`,
        errors: [
          {
            message: noRecompose.message,
            type: 'ImportDeclaration',
          },
        ],
      },
      {
        code: `import { withState } from 'recompose';`,
        errors: [
          {
            message: noRecompose.message,
            type: 'ImportDeclaration',
          },
        ],
      },
      {
        code: `import { abc, withState as something, def } from 'recompose';`,
        errors: [
          {
            message: noRecompose.message,
            type: 'ImportDeclaration',
          },
        ],
      },
      {
        code: `const withState = require('recompose/withState')`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `const { withState } = require('recompose')`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `const { withState: something } = require('recompose')`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `import('recompose/withState').then(()=>{})`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
      {
        code: `(async () => { const m = await import('recompose/withState'); })()`,
        errors: [
          {
            message: noRecompose.message,
            type: 'CallExpression',
          },
        ],
      },
    ],
  });

  describe.each(directImport)(
    'deprecates direct import recompose/%s ',
    (method, ruleName, errorMessage, rule) => {
      ruleTester.run(ruleName, rule, {
        valid: [
          "import React from 'react'",
          "const React = require('react');",
          "import('React')",
        ],
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
            code: `import { abc, ${method} as something, def } from 'recompose';`,
            errors: [
              {
                message: errorMessage,
                type: 'ImportDeclaration',
              },
            ],
          },
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
          {
            code: `const { ${method}: something } = require('recompose')`,
            errors: [
              {
                message: errorMessage,
                type: 'CallExpression',
              },
            ],
          },
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
