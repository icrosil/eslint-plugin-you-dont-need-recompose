const noAnyImport = require('./rules/utils/no-any-import');

const methods = require('./rules/methods');
const noRecompose = require('./rules/no-recompose');
const { RULE_OFF, RULE_ERROR } = require('./rules/constant');

const PLUGIN_NAME = 'you-dont-need-recompose';

// Rule for each method with default levels described in `methods.js`
const methodWithRules = Object.keys(methods).reduce((agg, method) => {
  const wrapperConfig = {
    method,
    message: methods[method].message,
  };
  Object.assign(agg, {
    [noAnyImport.ruleName(method)]: {
      rule: noAnyImport.wrapper(wrapperConfig),
      url: methods[method].url,
      level: methods[method].level,
    },
  });
  return agg;
}, {});

// single rule to deprecate recompose
const noRecomposeRule = {
  [noRecompose.ruleName()]: noRecompose,
};

const rules = Object.assign({}, methodWithRules, noRecomposeRule);

// All rules exported
module.exports.rules = Object.keys(rules).reduce((agg, ruleKey) => {
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

// function to add proper levels to rules
const configure = (list, level) => {
  return Object.keys(list).reduce((agg, rule) => {
    Object.assign(agg, {
      [`${PLUGIN_NAME}/${rule}`]: level || rules[rule].level || RULE_OFF,
    });
    return agg;
  }, {});
};

// plugins exported
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
