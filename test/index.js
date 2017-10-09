import 'regenerator-runtime/runtime'
import test from 'ava'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import PrefetchPolyfillPlugin from '../index.js'

const OUTPUT_DIR = path.join(__dirname, '../dist')
const promify = (webpack) => {
  return (config) => {
    return new Promise((resolve, reject) => {
      webpack(config, (err, result) => {
        if(err) {
          reject(err)
        }else {
          resolve(result)
        }
      })
    })
  }
}

const webpackp = promify(webpack)

test('PrefetchPolyfillPlugin prefetches async chunks', async t => {
  const result = await webpackp({
    entry: {
      js: path.join(__dirname, '../testcase/index.js')
    },
    output: {
      path: OUTPUT_DIR,
      filename: 'bundle.js',
      chunkFilename: 'chunk.[chunkhash].js',
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new PrefetchPolyfillPlugin()
    ]
  })

  t.is(JSON.stringify(result.compilation.errors), '[]')
  const html = result.compilation.assets['index.html'].source()
  t.regex(html, /preloadJs\s=\s\['\/chunk/)
})

test('empty output publicPath', async t => {
  const result = await webpackp({
    entry: {
      js: path.join(__dirname, '../testcase/index.js')
    },
    output: {
      path: OUTPUT_DIR,
      filename: 'bundle.js',
      chunkFilename: 'chunk.[chunkhash].js'
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new PrefetchPolyfillPlugin()
    ]
  })

  t.is(JSON.stringify(result.compilation.errors), '[]')
  const html = result.compilation.assets['index.html'].source()
  t.regex(html, /preloadJs\s=\s\['chunk/)
})

test('script async mode', async t => {
  const result = await webpackp({
    entry: {
      js: path.join(__dirname, '../testcase/index.js')
    },
    output: {
      path: OUTPUT_DIR,
      filename: 'bundle.js',
      chunkFilename: 'chunk.[chunkhash].js',
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new PrefetchPolyfillPlugin({
        mode: 'async'
      })
    ]
  })

  t.is(JSON.stringify(result.compilation.errors), '[]')
  const html = result.compilation.assets['index.html'].source()
  t.regex(html, /preloadJs\s=\s\['\/chunk/)
})

