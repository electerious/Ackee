'use strict'

const { resolve } = require('path')
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const preload = require('../utils/preload')
const html = require('../ui/index')

const isDemo = require('../utils/isDemo')
const isProductionEnv = require('../utils/isProductionEnv')

const index = async () => {

	return html()

}

const styles = async () => {

	const filePath = resolve(__dirname, '../ui/styles/index.scss')

	return sass(filePath, {
		optimize: isProductionEnv === true
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
		optimize: isProductionEnv === true,
		env: {
			DEMO: isDemo === true ? 'true' : 'false',
			NODE_ENV: isProductionEnv === true ? 'production' : 'development'
		},
		babel
	})

}

module.exports = {
	index: isProductionEnv === true ? preload(index) : index,
	styles: isProductionEnv === true ? preload(styles) : styles,
	scripts: isProductionEnv === true ? preload(scripts) : scripts
}