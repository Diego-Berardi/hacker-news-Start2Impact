const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry : './src/assets/js/index.js',
  output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Hacker News',
    template: './src/template.html'
  })],
  
  module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    open:true,
    port: 9000,
  },
  
};