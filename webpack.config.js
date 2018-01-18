const webpack = require('webpack')
const path = require('path')

console.log(process.cwd() + '/dist')
console.log(__dirname)



let sourcemap, watcher

module.exports = {
	entry : path.join(__dirname, '/javascript/init.js'),
	output: {
		path: process.cwd(),
		filename: 'main.bundle.js'
	},
	watch:true,
	devServer : {
		contentBase      : process.cwd(),
        open             : true  ,
        watchContentBase : true  ,
        port             : 9669
	},
	plugins: [
        new webpack.ProvidePlugin({
            $      : 'jquery',
            jQuery : 'jquery'
        }),
	],
	module: {
	    rules: [
	      {
	        test: /\.js$/,
	        exclude: /(node_modules)/,
	        use: {
	          loader: 'babel-loader',
	          options: {
	            presets: ['env']
	          }
	        },
	      }
	    ]
	 }
}