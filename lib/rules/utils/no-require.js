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
            const [arg] = node.arguments;
            // direct require
            if (
              arg &&
              arg.type === 'Literal' &&
              arg.value.includes('recompose/') &&
              arg.value.includes(method)
            ) {
              context.report(node, message);
              return;
            }
            // destructure require
            if (
              arg.type === 'Literal' &&
              arg.value === 'recompose' &&
              node.parent.type === 'VariableDeclarator'
            ) {
              if (method === 'recompose') {
                context.report(node, message);
                return;
              }
              if (
                !node.parent.id.properties ||
                (node.parent.id.properties &&
                  node.parent.id.properties.some(
                    property => property.key.name === method,
                  ))
              ) {
                context.report(node, message);
              }
            }
          }
        },
      };
    };
  },
};
