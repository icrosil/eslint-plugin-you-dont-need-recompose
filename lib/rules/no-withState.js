const message = 'Use hook "useState" instead of recompose/withState';

module.exports = function noWithState(context) {
  return {
    CallExpression(node) {
      if (node.callee.type !== 'Import') {
        return;
      }

      const arg = node.arguments[0];

      if (arg.type === 'Literal' && arg.value === 'recompose/withState') {
        context.report(node, message);
      }
    },
  };
};
