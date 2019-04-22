const required = require('required-parameter');

const ESLINT_OFF = 0;
const ESLINT_ERROR = 2;

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
  { message = defaultMessage(method), url, level },
) {
  return {
    [method]: {
      message,
      url,
      level,
    },
  };
}

const defaultErrorMethods = [
  // hoc
  'mapProps',
  'withProps',
  'withHandlers',
  'defaultProps',
  'renameProp',
  'renameProps',
  'flattenProp',
  'branch',
  'renderComponent',
  'renderNothing',
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
  {
    method: 'withState',
    message: hookMessage('useState'),
    url: 'https://reactjs.org/docs/hooks-state.html',
  },
  {
    method: 'withStateHandlers',
    message: hookMessage('useState'),
    url: 'https://reactjs.org/docs/hooks-state.html',
  },
  {
    method: 'shouldUpdate',
    message: funcMessage('React.memo'),
    url:
      'https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate',
  },
  {
    method: 'pure',
    message: funcMessage('React.memo'),
    url:
      'https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate',
  },
  {
    method: 'onlyUpdateForKeys',
    message: funcMessage('React.memo'),
    url:
      'https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate',
  },
  {
    method: 'onlyUpdateForPropTypes',
    message: funcMessage('React.memo'),
    url:
      'https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate',
  },
  {
    method: 'withContext',
    message: hookMessage('useContext'),
    url: 'https://reactjs.org/docs/hooks-reference.html#usecontext',
  },
  {
    method: 'getContext',
    message: hookMessage('useContext'),
    url: 'https://reactjs.org/docs/hooks-reference.html#usecontext',
  },
  {
    method: 'lifecycle',
    message: hookMessage('useEffect'),
    url:
      'https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks',
  },
  {
    method: 'withReducer',
    message: hookMessage('useReducer'),
    url: 'https://reactjs.org/docs/hooks-reference.html#usereducer',
  },
  {
    method: 'withPropsOnChange',
    message: 'Schedule an update while rendering instead. (c) React',
    url:
      'https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops',
  },
];

const allErrorMethods = defaultErrorMethods
  .map(function mapDefaultErrorMethods(method) {
    return {
      method,
      level: ESLINT_OFF,
    };
  })
  .concat(
    customErrorMethods.map(rule =>
      Object.assign({}, rule, { level: ESLINT_ERROR }),
    ),
  );

module.exports = allErrorMethods.reduce(function reduceMethod(agg, rule) {
  // no first param empty is expected
  Object.assign(agg, defaultMethodGenerator(rule.method, rule));
  return agg;
}, {});
