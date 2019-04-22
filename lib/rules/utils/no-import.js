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
            source.value === `recompose/${method}`
          ) {
            context.report(node, message);
          }
          // destructured import
          if (source.type === 'Literal' && source.value === `recompose`) {
            node.specifiers.forEach(specifier => {
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
