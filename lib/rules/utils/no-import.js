const required = require('required-parameter');

module.exports = {
  ruleName: function ruleName(method = required('method')) {
    return `no-import-${method}`;
  },
  wrapper: function noImportWrapper({
    method = required('method'),
    message = required('message'),
  }) {
    return function noImport(context) {
      return {
        ImportDeclaration(node) {
          const { source } = node;
          if (
            source.type === 'Literal' &&
            source.value === `recompose/${method}`
          ) {
            context.report(node, message);
          }
        },
      };
    };
  },
};
