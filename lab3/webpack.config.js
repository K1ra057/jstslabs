const path = require('path');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], 
    alias: {
      '@src': path.resolve(__dirname, 'src/')
    },
    modules: [path.resolve(__dirname, 'src/'), 'node_modules']
  },
  cache: {
    type: 'filesystem', 
  },
  devServer: {
    static: './',
    port: 9000,
  },
  mode: 'development'
};
