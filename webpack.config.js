const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry : path.join(__dirname, 'javascript/init.js'),
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle.js'
	},
	watch: true,
	target: 'node',
	devServer : {
		contentBase      : path.join(__dirname, './'),
		inline			 : true  ,
		hot				 : true	 ,
        open             : true  ,
        watchContentBase : true  ,
        port             : 9669
	},
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
	         // Settings for webpack-dev-server
	      }
	    ]
	 }
}