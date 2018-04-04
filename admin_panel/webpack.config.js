const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: [
		'babel-polyfill',
		path.join(__dirname, 'js/config.js'),
		path.join(__dirname, 'js/index.js')
	],
	output: {
		path: path.join(__dirname, 'dist'),
		// publicPath: path.join(process.cwd(), 'src'),
		filename: 'js/main.bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'), //за какой папкой слежу
		inline: true,
		hot: true,
		watchContentBase: true, //перезагрузка при изменении
		port: 6650
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			hunks: ['blog', 'common'],
			template: path.join(__dirname, 'admin.html')
		}),
		new ExtractTextPlugin('style.css'),
		// new ExtractTextPlugin('src/style/app.scss'),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'es2015', 'stage-0']
				}
			},
		}, {
			test: /\.pug$/,
			loader: 'pug-loader',
			options: {
				pretty: true
			}
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader', 'sass-loader']
			})
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.(jpg|png|svg)$/,
			loader: 'file-loader',
			options: {
				name: 'img/[name].[ext]'
			}
		}]
	}
}