'use strict';

const path = require('path'),
	webpack = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, './public/scripts'),
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['env', {
								'targets': { node: 'current' }
							}]
						],
						sourceMap: true
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				API_KEY: JSON.stringify(process.env.API_KEY)
			}
		})
	]
};
