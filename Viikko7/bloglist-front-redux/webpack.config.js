const path = require('path')
const webpack = require('webpack')

const config = ( env, argv ) => {

  const backend_url = argv.mode === 'production'
    ? 'http://localhost:9001'
    : 'http://localhost:9001'

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      /*eslint-disable */
      path: path.resolve(__dirname, 'build'),
      /*eslint-enable */
      filename: 'main.js'
    },
    devServer: {
      /*eslint-disable */
      contentBase: path.resolve(__dirname, 'build'),
      /*eslint-enable */
      compress: true,
      port: 3003,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}
/*eslint-disable */
module.exports = config