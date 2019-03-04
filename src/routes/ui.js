'use strict'

const path = require('path')
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const preload = require('../preload')
const html = require('../ui/index')

const index = async () => {

	return html()

}

const styles = async () => {

	const filePath = path.resolve(__dirname, '../ui/styles/index.scss')
	const opts = { optimize: true }

	return sass(filePath, opts)

}

const scripts = async () => {

	const filePath = path.resolve(__dirname, '../ui/scripts/index.js')

	const babel = {
		presets: [
			[
				'@babel/preset-env', {
					targets: {
						browsers: [
							'last 2 Safari versions',
							'last 2 Chrome versions',
							'last 2 Opera versions',
							'last 2 Firefox versions'
						]
					}
				}
			]
		],
		babelrc: false
	}

	const opts = {
		optimize: false,
		browserify: {},
		babel
	}

	return js(filePath, opts)

}

module.exports = {
	index: process.env.NODE_ENV === 'development' ? index : preload(index),
	styles: process.env.NODE_ENV === 'development' ? styles : preload(styles),
	scripts: process.env.NODE_ENV === 'development' ? scripts : preload(scripts)
}