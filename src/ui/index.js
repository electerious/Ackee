'use strict'

const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises
const js = require('rosid-handler-js-next')

const layout = require('../utils/layout')
const config = require('../utils/config')
const customTracker = require('../utils/customTracker')
const signale = require('../utils/signale')

const index = async () => {

	return layout('<div id="main"></div>', 'favicon.ico', [ 'index.css' ], [ 'index.js' ], {
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
		signale.await(`Building and writing '${ path }'`)
		const data = await fn()
		await writeFile(path, data)
		signale.success(`Finished building '${ path }'`)
	} catch (err) {
		signale.fatal(err)
		process.exit(1)
	}

}


const sw = async () => {

	const filePath = resolve(__dirname, './sw.js')

	return js(filePath, {
		optimize: config.isDevelopmentMode === false,
		nodeGlobals: config.isDevelopmentMode === true,
		babel: false,
		replace: {
			BUILD: JSON.stringify(require('../../package.json').version),
			ASSETS: JSON.stringify([
				'.', 'favicon.ico', 'index.css', 'index.js', 'icon.png', 'manifest.webmanifest'
			])
		}
	})

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
	sw,
	manifest
}