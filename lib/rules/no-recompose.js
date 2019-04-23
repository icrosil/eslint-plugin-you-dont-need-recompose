const noAnyImport = require('./utils/no-any-import');

const message = 'Usage of "recompose" is deprecated';
const method = 'recompose';

module.exports = {
  message,
  ruleName() {
    return noAnyImport.ruleName(method);
  },
  rule(context) {
    const noRuleWithContext = noAnyImport.wrapper({ method, message })(context);
    return noRuleWithContext;
  },
};
