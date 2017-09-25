# prefetch-polyfill-webpack-plugin

[![Build Status](https://travis-ci.org/jin5354/prefetch-polyfill-webpack-plugin.svg?branch=master)](https://travis-ci.org/jin5354/prefetch-polyfill-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/jin5354/prefetch-polyfill-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/jin5354/prefetch-polyfill-webpack-plugin?branch=master)

## Intro

This plugin automatically wire up thunks with a defer prefetch function(using new Image().src) for platform which doesn't support `<link rel='prefetch'>`, such as iOS safari.

You MUST use this plugin with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

```html
<script defer>
  (function(){
    window.onload = function () {
      var i = 0, length = 0,
        preloadJs = ['/chunk.a839f9eac501a92482ca.js', ...your thunks]

      for (i = 0, length = preloadJs.length; i < length; i++) {
        new Image().src = preloadJs[i]
      }
    }
  })()
</script>
```

## Install

```bash
npm install prefetch-polyfill-webpack-plugin --save-dev
```

## Usage

In webpack config, require the plugin:

```javascript
const PrefetchPolyfillPlugin = require('prefetch-polyfill-webpack-plugin');
```

and add this plugin after HtmlWebpackPlugin:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new PrefetchPolyfillPlugin()
]
```

## Acknowledgment

[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)

## LICENSE

MIT
