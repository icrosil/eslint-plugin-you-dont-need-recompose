const required = require('required-parameter');

// TODO: get rid of array functions
function defaultMessage(method) {
  return `Import of recompose/${method} is deprecated`;
}
function hookMessage(hook) {
  return `Prefer to use hook '${hook}'`;
}
function funcMessage(funcName) {
  return `Prefer to use ${funcName}`;
}

function defaultMethodGenerator(
  method = required('method'),
  message = defaultMessage(method),
) {
  return {
    [method]: {
      message,
    },
  };
}

// TODO: check internal hocs and deprecate what uses internal things or have
// something in newer version of react or hooks
const defaultErrorMethods = [
  // hoc
  'mapProps',
  'withProps',
  'withPropsOnChange',
  'withHandlers',
  'defaultProps',
  'renameProp',
  'renameProps',
  'flattenProp',
  'withReducer',
  'branch',
  'renderComponent',
  'renderNothing',
  'pure',
  'onlyUpdateForKeys',
  'onlyUpdateForPropTypes',
  'toClass',
  'toRenderProps',
  'fromRenderProps',
  // Static
  'setStatic',
  'setPropTypes',
  'setDisplayName',
  // Utils
  'compose',
  'getDisplayName',
  'wrapDisplayName',
  'shallowEqual',
  'isClassComponent',
  'createSink',
  'componentFromProp',
  'nest',
  'hoistStatics',
  // Observables
  'componentFromStream',
  'componentFromStreamWithConfig',
  'mapPropsStream',
  'mapPropsStreamWithConfig',
  'createEventHandler',
  'createEventHandlerWithConfig',
  'setObservableConfig',
];

const customErrorMethods = [
  // hoc
  { method: 'withState', message: hookMessage('useState') },
  { method: 'withStateHandlers', message: hookMessage('useState') },
  { method: 'shouldUpdate', message: funcMessage('React.memo') },
  { method: 'withContext', message: hookMessage('useContext') },
  { method: 'getContext', message: hookMessage('useContext') },
  { method: 'lifecycle', message: hookMessage('useEffect') },
];

const allErrorMethods = defaultErrorMethods
  .map(function mapDefaultErrorMethods(method) {
    return {
      method,
    };
  })
  .concat(customErrorMethods);

module.exports = allErrorMethods.reduce(function reduceMethod(agg, rule) {
  // no first param empty is expected
  Object.assign(agg, defaultMethodGenerator(rule.method, rule.message));
  return agg;
}, {});
