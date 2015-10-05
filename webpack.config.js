module.exports = {
  entry: "./app/js/main.jsx",
  output: {
    path: './app/js/',
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  devServer: {
    contentBase: './app'
  }
}
