<p align="center">
  <a href="https://fazendadosoftware.github.io/lxr-ui/">
    <img width="300" src="https://raw.githubusercontent.com/fazendadosoftware/lxr-ui/develop/packages/docs/src/assets/img/lxr-ui-logo.svg">
  </a>

<p align="center">
<img src="https://img.shields.io/npm/v/lxr-ui?color=blue">
<img src="https://img.shields.io/npm/l/lxr-ui">
<img src="https://img.shields.io/npm/dw/lxr-ui">
<img src="https://img.badgesize.io/https:/unpkg.com/lxr-ui/?label=Brotli%20size%3A%20JS&compression=brotli">

<a href="https://twitter.com/lxr_ui">
  <img src="https://img.shields.io/twitter/follow/lxr_ui?label=Lxr-UI&style=social" alt="Twitter Follow">
</a>
</p>
</p>

<h2 align="center">
  Lxr-UI
</h2>

<div align="center">
Lxr-UI is a Vue 3 Component Library for Building LeanIX Custom Reports.
<br>
  <a href="https://fazendadosoftware.github.io/lxr-ui/"><strong>Explore Lxr-UI docs</strong></a>
</div>

# Features
  - Out-of-the-box Vue 3 Components matching LeanIX UI style
  - Based on TypeScript

# Links

<b> Twitter: </b> [@lxr-ui](https://twitter.com/lxr_ui)

# Install

You need [Vue.js](https://v3.vuejs.org/) version 3.0+

```bash
# npm
npm install lxr-ui
```

```bash
# yarn
yarn add lxr-ui
```

# Usage

## All components

```js
import { createApp } from 'vue'
import LxrUi from 'lxr-ui'

createApp.use(LxrUi)
```

## Or individual components

```js
import { createApp } from 'vue'
import { LxrTable } from 'lxr-ui'

createApp.component('lxr-table', LxrTable)
```

# License

[MIT](https://raw.githubusercontent.com/fazendadosoftware/lxr-ui/master/LICENSE)