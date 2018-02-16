const webpack = require('webpack')
const path = require('path')

console.log(process.cwd() + '/dist')
console.log(__dirname) //папка из которой запускается (там где вебпак конфиг)



let sourcemap, watcher

module.exports = {
	entry: path.join(__dirname, '/javascript/init.js'),
	output: {
		path: process.cwd(),
		filename: 'main.bundle.js'
	},
	watch: true, //отслеживать изменение файла
	devServer: {
		contentBase: process.cwd(), //за какой папкой слежу
		// hot: true, // включение хота
		// inline: true, // онлайн перезагрузка (не хот)
		open: true, // нпм ран старт
		watchContentBase: true, //перезагрузка при изменении
		port: 7778
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			},
		}]
	}
}