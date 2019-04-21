/* eslint-disable no-param-reassign */
const {
  ruleName: noImportRuleName,
  wrapper: noImportWrapper,
} = require('./rules/utils/no-import');
const {
  ruleName: noDynamicImportRuleName,
  wrapper: noDynamicImportWrapper,
} = require('./rules/utils/no-dynamic-import');
const methods = require('./rules/methods.json');
const {
  ruleName: noDynamicImportRecomposeName,
  rule: noDynamicImportRecompose,
} = require('./rules/no-dynamic-import-recompose');

const PLUGIN_NAME = 'you-dont-need-recompose';
const RULE_WARN = 1;
const RULE_OFF = 2;

const methodKeys = Object.keys(methods);

const methodWithRules = methodKeys.reduce((agg, method) => {
  agg[noImportRuleName(method)] = noImportWrapper({
    method,
    message: methods[method].message,
  });
  agg[noDynamicImportRuleName(method)] = noDynamicImportWrapper({
    method,
    message: methods[method].message,
  });
  return agg;
}, {});

const rules = Object.assign({}, methodWithRules, {
  [noDynamicImportRecomposeName()]: noDynamicImportRecompose,
});

module.exports.rules = rules;

const configure = (list, level) => {
  return Object.keys(list).reduce((agg, rule) => {
    agg[`${PLUGIN_NAME}/${rule}`] = level;
    return agg;
  }, {});
};

module.exports.configs = {
  acdlite: {
    plugins: [PLUGIN_NAME],
    rules: configure(rules, RULE_OFF),
  },
  recommended: {
    plugins: [PLUGIN_NAME],
    rules: configure(rules, RULE_WARN), // TODO: off only partial, else nothing
  },
};
