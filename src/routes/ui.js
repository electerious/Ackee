'use strict'

const { resolve } = require('path')
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const preload = require('../utils/preload')
const html = require('../ui/index')

const optimize = process.env.NODE_ENV !== 'development'

const index = async () => {

	return html()

}

const styles = async () => {

	const filePath = resolve(__dirname, '../ui/styles/index.scss')

	return sass(filePath, {
		optimize
	})

}

const scripts = async () => {

	const filePath = resolve(__dirname, '../ui/scripts/index.js')

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

	return js(filePath, {
		optimize,
		babel
	})

}

module.exports = {
	index: optimize === true ? preload(index) : index,
	styles: optimize === true ? preload(styles) : styles,
	scripts: optimize === true ? preload(scripts) : scripts
}