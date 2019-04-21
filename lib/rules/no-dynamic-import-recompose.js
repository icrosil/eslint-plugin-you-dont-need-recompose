const message = 'Dynamic import of "recompose" is deprecated';

// TODO: only recompose should be separate
module.exports = {
  message,
  ruleName: function ruleName() {
    return 'no-dynamic-import-recompose';
  },
  rule: function noDynamicImport(context) {
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
