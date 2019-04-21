// module.exports = function noImport(context) {
//   return {
//     ImportDeclaration(node) {
//       node.specifiers.forEach(function checkSpecifier(specifier) {
//         if (
//           (specifier.type === 'ImportDefaultSpecifier' ||
//             specifier.type === 'ImportNamespaceSpecifier') &&
//           specifier.local.type === 'Identifier' &&
//           specifier.local.name === 'moment'
//         ) {
//           context.report(
//             node,
//             'Use date-fns or Native Date methods instead of moment.js',
//           );
//         }
//       });
//     },
//   };
// };
