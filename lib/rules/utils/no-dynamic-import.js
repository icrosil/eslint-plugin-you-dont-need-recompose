const required = require('required-parameter');

module.exports = {
  ruleName(method = required('method')) {
    return `no-dynamic-import-${method}`;
  },
  wrapper({ method = required('method'), message = required('message') }) {
    return context => {
      return {
        CallExpression(node) {
          if (node.callee.type !== 'Import') {
            return;
          }

          const [arg] = node.arguments;

          if (arg.type === 'Literal' && arg.value === `recompose/${method}`) {
            context.report(node, message);
          }
        },
      };
    };
  },
};
