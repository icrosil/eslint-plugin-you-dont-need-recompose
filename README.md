# eslint-plugin-you-dont-need-recompose

Eslint rules to avoid parts of recompose lib

## WIP

### General

- 'no' rule for every api in recompose +
- 'recommended' to not use only state API +
- 'acdlite' to avoid all recompose +
- fixable, don't think so -
- url to docs +

### Imports

- should work with `import func from 'recompose/func'` +
- should work with `import { func } from 'recompose'` +
- should work with dynamic import +
- should work with require +
- should fail on usage of this methods ? doesn't import error enough? -

### TODO:

- [eslint](https://eslint.org/docs/developer-guide/working-with-rules) +
- [react](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components) +
- `you-dont-need-recompose/no-import-withState` maybe too long for an rule name -
- `Prefer to use hook 'useState'` should be more mnemonic -
- eslint peer dependency to be as lower as possible or 5.3.0 +
- add min node version +
- renaming should also work import {withState as onState} from 'recompose' also with require +
- add links to more mnemonic description about rules + links to React docs +
- eslint support url +
- TODO fix +
- perf
- optimize rules
- maybe put eslint files next to rules as units
- add jest, coveralls, test:perf, travis and deploy and all of that
- npm package add more keywords
- Fill Readme - why, how to use it
