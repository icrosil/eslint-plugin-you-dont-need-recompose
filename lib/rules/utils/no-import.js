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
          // direct import
          if (
            source.type === 'Literal' &&
            source.value === `recompose/${method}`
          ) {
            context.report(node, message);
          }
          // destructured import
          if (source.type === 'Literal' && source.value === `recompose`) {
            node.specifiers.forEach(function checkSpecifier(specifier) {
              if (
                specifier.type === 'ImportSpecifier' &&
                specifier.local.type === 'Identifier' &&
                specifier.local.name === method
              ) {
                context.report(node, message);
              }
            });
          }
        },
      };
    };
  },
};
