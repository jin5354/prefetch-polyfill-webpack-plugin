'use strict'

/**
 * flatten array
 * @param {array} arr
 */
const flatten = arr => arr.reduce((prev, curr) => prev.concat(curr), [])

/**
 * generator script
 * @param {array} files
 * @param {string} mode
 */
const generator = (files, mode = 'image') => {
  switch(mode) {
    case('image'): {
      return `<script>
      (function(){
        var ua = (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
        if(/safari|iphone|ipad|ipod|msie|trident/i.test(ua) && !/chrome|crios|crmo|firefox|iceweasel|fxios|edge/i.test(ua)) {
          window.onload = function () {
            var i = 0, length = 0,
              preloadJs = [${files.join(',')}]

            for (i = 0, length = preloadJs.length; i < length; i++) {
              new Image().src = preloadJs[i]
            }
          }
        }
      })()
      </script>`
    }
    case('async'): {
      return `<script>
      (function(){
        var ua = (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
        if(/safari|iphone|ipad|ipod|msie|trident/i.test(ua) && !/chrome|crios|crmo|firefox|iceweasel|fxios|edge/i.test(ua)) {
          window.onload = function () {
            var i = 0, length = 0, js,
              preloadJs = [${files.join(',')}]

            for (i = 0, length = preloadJs.length; i < length; i++) {
              js = document.createElement('script')
              js.src = preloadJs[i]
              js.async = true
              document.body.appendChild(js)
            }
          }
        }
      })()
      </script>`
    }
  }
}

/**
 * @class PrefetchPolyfillPlugin
 */
class PrefetchPolyfillPlugin {

  constructor(options) {
    this.options = options || {}
    this.mode = this.options.mode
  }

  apply(compiler) {
    let extractedChunks = []
    let files = []
    let str = ''

    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
        // get async thunks
        extractedChunks = compilation.chunks.filter(chunk => !chunk.isInitial())
        const publicPath = compilation.outputOptions.publicPath || ''
        // get files
        files = flatten(extractedChunks.map(chunk => chunk.files)).map(entry => `'${publicPath}${entry}'`)
        str = generator(files, this.mode)
        // inject
        htmlPluginData.html = htmlPluginData.html.replace('</body>', str + '</body>')
        cb(null, htmlPluginData)
      })
    })
  }

}

module.exports = PrefetchPolyfillPlugin
