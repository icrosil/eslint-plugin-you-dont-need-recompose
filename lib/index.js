/* eslint-disable no-param-reassign */
const {
  ruleName: noImportRuleName,
  wrapper: noImportWrapper,
} = require('./rules/utils/no-import');
const {
  ruleName: noDynamicImportRuleName,
  wrapper: noDynamicImportWrapper,
} = require('./rules/utils/no-dynamic-import');
const methods = require('./rules/methods');
const {
  ruleName: noDynamicImportRecomposeName,
  rule: noDynamicImportRecompose,
} = require('./rules/no-dynamic-import-recompose');
const {
  ruleName: noRequireRuleName,
  wrapper: noRequireWrapper,
} = require('./rules/utils/no-require');

// TODO: fix mess of names and objects
const PLUGIN_NAME = 'you-dont-need-recompose';
const RULE_OFF = 0;
const RULE_ERROR = 2;

const methodKeys = Object.keys(methods);

const ruleMethodGenerator = method => rule => ({
  rule,
  url: methods[method].url,
  level: methods[method].level,
});

const methodWithRules = methodKeys.reduce((agg, method) => {
  const ruleGenerator = ruleMethodGenerator(method);
  const wrapperConfig = {
    method,
    message: methods[method].message,
  };
  agg[noImportRuleName(method)] = ruleGenerator(noImportWrapper(wrapperConfig));
  agg[noDynamicImportRuleName(method)] = ruleGenerator(
    noDynamicImportWrapper(wrapperConfig),
  );
  agg[noRequireRuleName(method)] = ruleGenerator(
    noRequireWrapper(wrapperConfig),
  );
  return agg;
}, {});

const rules = Object.assign({}, methodWithRules, {
  [noDynamicImportRecomposeName()]: {
    rule: noDynamicImportRecompose,
  },
});

const rulesKeys = Object.keys(rules);

module.exports.rules = rulesKeys.reduce((agg, ruleKey) => {
  Object.assign(agg, {
    [ruleKey]: rules[ruleKey].rule,
  });
  return agg;
}, {});

const configure = (list, level) => {
  return Object.keys(list).reduce((agg, rule) => {
    agg[`${PLUGIN_NAME}/${rule}`] = level || rules[rule].level || RULE_OFF;
    return agg;
  }, {});
};

// TODO: optimize and pass only rules needed, for acdlite just trigger any recompose usage
// TODO: for recommended just use customed error
// TODO: maybe import all error types in one import require and dynamic and that's it
module.exports.configs = {
  acdlite: {
    plugins: [PLUGIN_NAME],
    rules: configure(rules, RULE_ERROR),
  },
  recommended: {
    plugins: [PLUGIN_NAME],
    rules: configure(rules),
  },
};
