var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'

  },
  output: {
    filename: 'public/dist/bundle.js',
    sourceMap: 'public/dist/bundle.map.js'

  },
  devtool: '#source-map',
  module: {
      loaders: [
        {
          loader: 'babel',
          test: /\.js?$/,
          exclude: /(node_modules)/,
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
  }
}
