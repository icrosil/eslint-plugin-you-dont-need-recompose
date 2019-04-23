const required = require('required-parameter');

const noImport = require('./no-import');
const noDynamicImport = require('./no-dynamic-import');
const noRequire = require('./no-require');

module.exports = {
  ruleName(method = required('method')) {
    return noImport.ruleName(method);
  },
  wrapper({ method = required('method'), message = required('message') }) {
    const optionObject = { method, message };
    const noImportDeclaration = noImport.wrapper(optionObject);
    const noDynamicImportExpression = noDynamicImport.wrapper(optionObject);
    const noRequireExpression = noRequire.wrapper(optionObject);
    return context => {
      const noImportWithContext = noImportDeclaration(context);
      const noDynamicImportWithContext = noDynamicImportExpression(context);
      const noRequireExpressionWithContext = noRequireExpression(context);
      return {
        ImportDeclaration(node) {
          noImportWithContext.ImportDeclaration(node);
        },
        CallExpression(node) {
          noRequireExpressionWithContext.CallExpression(node);
          noDynamicImportWithContext.CallExpression(node);
        },
      };
    };
  },
};
