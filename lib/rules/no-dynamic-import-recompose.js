const message = 'Dynamic import of "recompose" is deprecated';

module.exports = {
  message,
  ruleName() {
    return 'no-dynamic-import-recompose';
  },
  rule(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== 'Import') {
          return;
        }

        const arg = node.arguments[0];

        if (arg.type === 'Literal' && arg.value === 'recompose') {
          context.report(node, message);
        }
      },
    };
  },
};
