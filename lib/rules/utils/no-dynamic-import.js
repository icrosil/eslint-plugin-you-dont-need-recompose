const required = require('required-parameter');

module.exports = {
  ruleName: function ruleName(method = required('method')) {
    return `no-dynamic-import-${method}`;
  },
  wrapper: function noDynamicImportWrapper({
    method = required('method'),
    message = required('message'),
  }) {
    return function noDynamicImport(context) {
      return {
        CallExpression(node) {
          if (node.callee.type !== 'Import') {
            return;
          }

          const arg = node.arguments[0];

          if (arg.type === 'Literal' && arg.value === `recompose/${method}`) {
            context.report(node, message);
          }
        },
      };
    };
  },
};
