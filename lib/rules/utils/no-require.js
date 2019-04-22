const required = require('required-parameter');

module.exports = {
  ruleName(method = required('method')) {
    return `no-require-${method}`;
  },
  wrapper({ method = required('method'), message = required('message') }) {
    return context => {
      return {
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'require'
          ) {
            const arg = node.arguments[0];
            // direct require
            if (
              arg &&
              arg.type === 'Literal' &&
              arg.value === `recompose/${method}`
            ) {
              context.report(node, message);
            }
            // destructure require
            if (
              node.parent.type === 'VariableDeclarator' &&
              node.parent.id.properties &&
              node.parent.id.properties.some(
                property => property.value.name === method,
              )
            ) {
              context.report(node, message);
            }
          }
        },
      };
    };
  },
};
