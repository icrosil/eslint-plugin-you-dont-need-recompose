const {
  ruleName: noImportRuleName,
  wrapper: noImportWrapper,
} = require('./rules/utils/no-any-import');

const methods = require('./rules/methods');
const noRecompose = require('./rules/no-recompose');

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
  Object.assign(agg, {
    [noImportRuleName(method)]: ruleGenerator(noImportWrapper(wrapperConfig)),
  });
  return agg;
}, {});

const noRecomposeRule = {
  [noRecompose.ruleName()]: noRecompose,
};

const rules = Object.assign({}, methodWithRules, noRecomposeRule);

const rulesKeys = Object.keys(rules);

module.exports.rules = rulesKeys.reduce((agg, ruleKey) => {
  Object.assign(agg, {
    [ruleKey]: {
      meta: {
        docs: {
          url: rules[ruleKey].url,
        },
      },
      create: rules[ruleKey].rule,
    },
  });
  return agg;
}, {});

const configure = (list, level) => {
  return Object.keys(list).reduce((agg, rule) => {
    Object.assign(agg, {
      [`${PLUGIN_NAME}/${rule}`]: level || rules[rule].level || RULE_OFF,
    });
    return agg;
  }, {});
};

module.exports.configs = {
  acdlite: {
    plugins: [PLUGIN_NAME],
    rules: configure(noRecomposeRule, RULE_ERROR),
  },
  recommended: {
    plugins: [PLUGIN_NAME],
    rules: configure(rules),
  },
};
