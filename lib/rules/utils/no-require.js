const required = require('required-parameter');

module.exports = {
  ruleName: function ruleName(method = required('method')) {
    return `no-require-${method}`;
  },
  wrapper: function noRequireWrapper({
    method = required('method'),
    message = required('message'),
  }) {
    return function noRequire(context) {
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
              node.parent.id.properties.some(function somePropertyIsMethod(
                property,
              ) {
                return property.value.name === method;
              })
            ) {
              context.report(node, message);
            }
          }
        },
      };
    };
  },
};
