# eslint-plugin-you-dont-need-recompose

Eslint rules to avoid parts of recompose lib

[![Build Status](https://travis-ci.org/icrosil/eslint-plugin-you-dont-need-recompose.svg?branch=master)](https://travis-ci.org/icrosil/eslint-plugin-you-dont-need-recompose)  [![Coverage Status](https://coveralls.io/repos/github/icrosil/eslint-plugin-you-dont-need-recompose/badge.svg?branch=master)](https://coveralls.io/github/icrosil/eslint-plugin-you-dont-need-recompose?branch=master)  [![Maintainability](https://api.codeclimate.com/v1/badges/6fe830dc12447fa3922b/maintainability)](https://codeclimate.com/github/icrosil/eslint-plugin-you-dont-need-recompose/maintainability)  [![Version](https://img.shields.io/npm/v/eslint-plugin-you-dont-need-recompose.svg)](https://www.npmjs.com/package/eslint-plugin-you-dont-need-recompose) [![dependencies Status](https://david-dm.org/icrosil/eslint-plugin-you-dont-need-recompose/status.svg)](https://david-dm.org/icrosil/eslint-plugin-you-dont-need-recompose) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## TL;DR

Eslint plugin.

- Rule for import of each method and recompose itself.
- `plugin:you-dont-need-recompose/recommended` to avoid HOCs that used state or hook-replaceable thing but don't alert HOCs like 'branch' or 'mapProps'.
- `plugin:you-dont-need-recompose/acdlite` to avoid any recompose import. (would be useful to avoid any recompose in part of codebase without touching old parts)

## How to use

Install

```sh
yarn add -D eslint-plugin-you-dont-need-recompose
```

Update your eslint config

```js
"extends" : ["plugin:you-dont-need-recompose/recommended"],
```

## You don't need recompose

If you are starting a brand new project it is totally fine to avoid adding recompose in the first place.
Hooks providing an alternative way of managing major part of problems recompose solved.
So, no recompose - no problem. More details [here](https://github.com/acdlite/recompose/issues/756#issuecomment-438674573) and on [recompose page](https://github.com/acdlite/recompose#a-note-from-the-author-acdlite-oct-25-2018).

## `Unpopular` opinion

What if you already have some app with recompose and that's fine till your all new code comes with hooks? Maybe you'd still like to use HOCs and hooks together but to avoid some parts of recompose.
This eslint plugin could help you.
The plugin provides a rule for each recompose method. So you can set each method with any level of warning.
Most likely you'd like to use one of presets: `recommended` or `acdlite`.

### recommended

Contains error only for this set of methods:

- withState
- withStateHandlers
- shouldUpdate
- pure
- onlyUpdateForKeys
- onlyUpdateForPropTypes
- withContext
- getContext
- lifecycle
- withReducer
- withPropsOnChange

### acdlite

Single rule to deprecate any usage of recompose at all.

## Inspired by

- [you dont need momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs)

## License

MIT
