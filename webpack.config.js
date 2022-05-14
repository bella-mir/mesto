const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'main.[hash].js',
        publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'), // путь к файлу index.html
      cache: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  mode: 'development',
  module:{
      rules:[
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              'postcss-loader'
            ]
          },
          {
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: "asset/resource",
          },
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
      ],
  },
  devServer: {
    // static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  devtool:'inline-source-map',
};

// переписали точку выхода, используя утилиту path 