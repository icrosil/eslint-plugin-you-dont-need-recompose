# eslint-plugin-you-dont-need-recompose

Eslint rules to avoid parts of recompose lib

## WIP

### General

- 'no' rule for every api in recompose
- 'recommended' to not use only state API
- 'acdlite' to avoid all recompose
- fixable?
- url to docs

### Imports

- should work with `import func from 'recompose/func'` +
- should work with `import { func } from 'recompose'` +
- should work with dynamic import
- should work with require
- should fail on usage of this methods

### TODO:

- [eslint](https://eslint.org/docs/developer-guide/working-with-rules)
- Fill Readme - why, how to use it
- add jest, coveralls, test:perf, travis and deploy and all of that
- npm package add more keywords
- `you-dont-need-recompose/no-import-withState` maybe too long for an rule name
- `Prefer to use hook 'useState'` should be more mnemonic
- eslint peer dependency to be as lower as possible or 5.x.x
- add min node version
