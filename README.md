# eslint-plugin-you-dont-need-recompose

Eslint rules to avoid parts of recompose lib

## WIP

### General

- 'no' rule for every api in recompose
- 'recommended' to not use only state API
- 'acdlite' to avoid all recompose

### Imports

- should work with `import func from 'recompose/func'`
- should work with `import { func } from 'recompose'`
- should work with babel/webpack aliases if possible
