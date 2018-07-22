'use strict'

const path = require('path')
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const index = require('../ui/index')

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
				'env', {
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
		plugins: [
			[
				'transform-object-rest-spread', {
					useBuiltIns: true
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
	index,
	styles,
	scripts
}