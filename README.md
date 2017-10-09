# prefetch-polyfill-webpack-plugin

[![Build Status](https://travis-ci.org/jin5354/prefetch-polyfill-webpack-plugin.svg?branch=master)](https://travis-ci.org/jin5354/prefetch-polyfill-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/jin5354/prefetch-polyfill-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/jin5354/prefetch-polyfill-webpack-plugin?branch=master)
[![npm package](https://img.shields.io/npm/v/prefetch-polyfill-webpack-plugin.svg)](https://www.npmjs.org/package/prefetch-polyfill-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dt/prefetch-polyfill-webpack-plugin.svg)](https://www.npmjs.org/package/prefetch-polyfill-webpack-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Intro

This plugin automatically wire up your async thunks with a prefetch polyfill function(using new Image().src or `<script async>`) for platform which doesn't support `<link rel='prefetch'>`, such as safari, to improve load time.

This is an extension plugin for [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

The prefetch polyfill function will be injected before `</body>`.

```html
<!-- as default it use new Image().src -->
<script>
  (function(){
    var ua = (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
    if(/safari|iphone|ipad|ipod|msie|trident/i.test(ua) && !/chrome|crios|crmo|firefox|iceweasel|fxios|edge/i.test(ua)) {
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

<!-- you can choose to use <script async> -->
<script>
(function(){
  var ua = (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
  if(/safari|iphone|ipad|ipod|msie|trident/i.test(ua) && !/chrome|crios|crmo|firefox|iceweasel|fxios|edge/i.test(ua)) {
    window.onload = function () {
      var i = 0, length = 0, js,
        preloadJs = ['/chunk.a839f9eac501a92482ca.js', ...your thunks]

      for (i = 0, length = preloadJs.length; i < length; i++) {
        js = document.createElement('script')
        js.src = preloadJs[i]
        js.async = true
        document.body.appendChild(js)
      }
    }
  }
})()
</script>
```

![example](https://user-images.githubusercontent.com/6868950/30850447-30b6856a-a26b-11e7-812a-9e85e9e4aebe.jpeg)

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

## options

### mode

Set mode to `async` to use `<script async>` to prefetch, or use `new Image().src` as default.

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new PrefetchPolyfillPlugin({
    mode: 'async'
  })
]
```

## Acknowledgment

[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)

## LICENSE

MIT
