'use strict'
const flatten = arr => arr.reduce((prev, curr) => prev.concat(curr), [])
const generator = files => {
  return `<script defer>
  (function(){
    window.onload = function () {
      var i = 0, length = 0,
        preloadJs = [${files.join(',')}]

      for (i = 0, length = preloadJs.length; i < length; i++) {
        new Image().src = preloadJs[i]
      }
    }
  })()
  </script>`
}

class PrefetchPolyfillPlugin {

  apply(compiler) {
    let extractedChunks = []
    let files = []
    let str = ''

    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
        extractedChunks = compilation.chunks.filter(chunk => !chunk.isInitial())
        const publicPath = compilation.outputOptions.publicPath || ''
        files = flatten(extractedChunks.map(chunk => chunk.files)).map(entry => `'${publicPath}${entry}'`)
        str = generator(files)
        htmlPluginData.html = htmlPluginData.html.replace('</body>', str + '</body>')
        cb(null, htmlPluginData)
      })
    })
  }

}

module.exports = PrefetchPolyfillPlugin
