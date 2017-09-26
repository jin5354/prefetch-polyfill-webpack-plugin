# prefetch-polyfill-webpack-plugin

[![Build Status](https://travis-ci.org/jin5354/prefetch-polyfill-webpack-plugin.svg?branch=master)](https://travis-ci.org/jin5354/prefetch-polyfill-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/jin5354/prefetch-polyfill-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/jin5354/prefetch-polyfill-webpack-plugin?branch=master)
[![npm package](https://img.shields.io/npm/v/prefetch-polyfill-webpack-plugin.svg)](https://www.npmjs.org/package/prefetch-polyfill-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dt/prefetch-polyfill-webpack-plugin.svg)](https://www.npmjs.org/package/prefetch-polyfill-webpack-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Intro

This plugin automatically wire up your async thunks with a prefetch polyfill function(using new Image().src) for platform which doesn't support `<link rel='prefetch'>`, such as safari.

You MUST use this plugin with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

The prefetch polyfill function will be injected before `</body>`.

```html
<script>
  (function(){
    var ua = (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
    if(/safari|iphone|ipad|ipod|msie|trident/i.test(ua)) {
      window.onload = function () {
        var i = 0, length = 0,
          preloadJs = ['/chunk.a839f9eac501a92482ca.js', ...your thunks]

        for (i = 0, length = preloadJs.length; i < length; i++) {
          new Image().src = preloadJs[i]
        }
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

This plugin works well with [preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin). If you are using code splitting you are recommended to use both plugin at the same time.

## Acknowledgment

[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)

## LICENSE

MIT
