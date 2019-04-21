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
          node.specifiers.forEach(function checkSpecifier(specifier) {
            if (
              (specifier.type === 'ImportDefaultSpecifier' ||
                specifier.type === 'ImportNamespaceSpecifier') &&
              specifier.local.type === 'Identifier' &&
              specifier.local.name === `recompose/${method}`
            ) {
              context.report(node, message);
            }
          });
        },
      };
    };
  },
};
