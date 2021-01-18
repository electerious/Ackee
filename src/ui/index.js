'use strict'

const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises

const layout = require('../utils/layout')
const config = require('../utils/config')
const customTracker = require('../utils/customTracker')
const signale = require('../utils/signale')

const index = async () => {

	return layout('<div id="main"></div>', 'favicon.ico', ['index.css'], ['index.js'], {
		isDemoMode: config.isDemoMode,
		customTracker
	})

}

const styles = async () => {

	const sass = require('rosid-handler-sass')
	const filePath = resolve(__dirname, './styles/index.scss')

	return sass(filePath, { optimize: config.isDevelopmentMode === false })

}

const scripts = async () => {

	const js = require('rosid-handler-js-next')
	const filePath = resolve(__dirname, './scripts/index.js')

	return js(filePath, {
		optimize: config.isDevelopmentMode === false,
		nodeGlobals: config.isDevelopmentMode === true,
		babel: false
	})

}

const tracker = async () => {

	const filePath = require.resolve('ackee-tracker')

	return readFile(filePath, 'utf8')

}

const build = async (path, fn) => {

	try {
		signale.await(`Building and writing '${path}'`)
		const data = await fn()
		await writeFile(path, data)
		signale.success(`Finished building '${path}'`)
	} catch (err) {
		signale.fatal(err)
		process.exit(1)
	}

}

const favicon = async () => {

	const filePath = resolve(__dirname, 'src/ui/images/favicon.ico')
	const data = readFile(filePath)

	return data

}

const icon = async () => {

	const filePath = resolve(__dirname, 'src/ui/images/icon.png')
	const data = readFile(filePath)

	return data

}


const sw = async () => {

	const filePath = resolve(__dirname, 'src/ui/sw.js')

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

	const data = js(filePath, {
		optimize: isDevelopmentMode === false,
		env: {
			ACKEE_TRACKER: process.env.ACKEE_TRACKER,
			ACKEE_DEMO: isDemoMode === true ? 'true' : 'false',
			NODE_ENV: isDevelopmentMode === true ? 'development' : 'production',
			BUILD: require('./package.json').version,
			ASSETS: [
				'.', 'favicon.ico', 'index.css', 'index.js', 'icon.png', 'manifest.webmanifest'
			]
		},
		babel
	})

	return data

}

const manifest = () => {

	const manifest = {
		name: 'Ackee - Analytics',
		short_name: 'Ackee',
		lang: 'en',
		start_url: '/',
		display: 'standalone',
		theme_color: '#282d2d',
		background_color: '#eef3dc',
		description: '',
		icons: [{
			src: '/icon.png',
			sizes: `512x512`,
			type: 'image/png',
			purpose: 'any maskable'
		}]
	}

	return JSON.stringify(manifest)

}


module.exports = {
	index,
	styles,
	scripts,
	tracker,
	build,
	favicon,
	icon,
	sw,
	manifest
}