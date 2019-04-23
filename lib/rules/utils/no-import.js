const required = require('required-parameter');

module.exports = {
  ruleName(method = required('method')) {
    return `no-import-${method}`;
  },
  wrapper({ method = required('method'), message = required('message') }) {
    return context => {
      return {
        ImportDeclaration(node) {
          const { source } = node;
          // direct import
          if (
            source.type === 'Literal' &&
            source.value.includes('recompose/') &&
            source.value.includes(method)
          ) {
            context.report(node, message);
            return;
          }
          if (source.type === 'Literal' && source.value === `recompose`) {
            if (method === 'recompose') {
              context.report(node, message);
              return;
            }
            // destructured import
            node.specifiers.forEach(specifier => {
              if (
                specifier.type === 'ImportSpecifier' &&
                specifier.imported &&
                specifier.imported.type === 'Identifier' &&
                specifier.imported.name === method
              ) {
                context.report(node, message);
                return;
              }
              if (
                specifier.type === 'ImportDefaultSpecifier' &&
                !specifier.imported &&
                specifier.local.type === 'Identifier'
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
