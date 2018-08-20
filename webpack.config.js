var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  // context: path.join(__dirname, "src"),
  // devtool: debug ? "inline-sourcemap" : false,
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: [ 'style-loader', 'css-loader' ]
      // }
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader', 'resolve-url-loader'],
      //   include: [
      //     path.join(__dirname, 'src'),
      //     /node_modules/
      //   ]
      // }
    ]
  },
  output: {
    path: __dirname + "/src/dist",
    filename: "project_bundle.js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  // plugins: debug ? [] : [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  //   new HtmlWebPackPlugin({template: "./src/index.html"})
  // ]
  plugins: [
    new HtmlWebPackPlugin({ template: "./src/index.html" })
  ]
}