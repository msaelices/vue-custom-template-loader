# vue-custom-template-loader
📦 Webpack loader for rendering multiples templates with [vue-loader](https://vue-loader.vuejs.org/) in Vue.js components

## What Vue Custom Template Loader does?

It allows you to use several templates in your Single-File Components (SFCs), which will be rendered depending on some conditions. This is possible thanks to the [custom blocks](https://vue-loader.vuejs.org/guide/custom-blocks.html) feature in `vue-loader`.

It would be useful, for example, if you are sharing code for both Native Mobile Apps with [NativeScript-vue](http://nativescript-vue.org) and regular Web apps.

See this `HelloWorld.vue` example:

``` vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<template-native>
  <Label :text="msg"></Label>
</template-native>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
```

The idea is render `<template>` only when the app target is a web browser and `<template-native>` when the target is a native mobile app.

## Setup

First, you need to install the loader in your app:

```bash
npm install vue-custom-template-loader --save-dev
```

Now we have to change the `webpack.config.js` file using the `vue-custom-template-loader` loader:

```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  ... # stuff
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // this rule applies to <template-native> blocks when TARGET is 'native'
      {
        loader: 'vue-custom-template-loader',
        resourceQuery: (query) => {
          let regex = /blockType=template-native/
          return query.match(regex) && process.env.TARGET === 'native'
        }
      }
    ]
  }
  plugins: [
    new VueLoaderPlugin()
  ],
  ... # more stuff
```

Finally, in order to send the correct `TARGET` environment variable, we should change the default `serve` NPM script created by `vue-cli` in the `package.json` from this:

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    ...
```

To this:

```json
  "scripts": {
    "serve:web": "cross-env TARGET=web vue-cli-service serve",
    "serve:native": "cross-env TARGET=native vue-cli-service serve",
    ...
```

## Code example

If you want to see a working sample, please review the `example/` directory on this repository.