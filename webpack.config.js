module.exports = {
  entry: "./app/main.jsx",
  output: {
    path: './app',
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
