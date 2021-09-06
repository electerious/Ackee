'use strict'

const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises

const layout = require('../utils/layout')
const config = require('../utils/config')
const customTracker = require('../utils/customTracker')
const signale = require('../utils/signale')

const index = () => {
	return layout('<div id="main"></div>', `${ config.baseUrl }/favicon.ico`, [ `${ config.baseUrl }/index.css` ], [ `${ config.baseUrl }/index.js` ], {
		isDemoMode: config.isDemoMode,
		customTracker,
	})
}

const styles = () => {
	const sass = require('rosid-handler-sass')
	const filePath = resolve(__dirname, './styles/index.scss')

	return sass(filePath, { optimize: config.isDevelopmentMode === false })
}

const scripts = () => {
	const js = require('rosid-handler-js-next')
	const filePath = resolve(__dirname, './scripts/index.js')

	return js(filePath, {
		optimize: config.isDevelopmentMode === false,
		nodeGlobals: config.isDevelopmentMode === true,
		replace: { 'process.env.NODE_ENV': JSON.stringify(config.isDevelopmentMode === true ? 'development' : 'production'), 'process.env.BASE_URL': config.baseUrl },
		babel: false,
	})
}

const tracker = () => {
	const filePath = require.resolve('ackee-tracker')

	return readFile(filePath, 'utf8')
}

const build = async (path, fn) => {
	try {
		signale.await(`Building and writing '${ path }'`)
		const data = await fn()
		await writeFile(path, data)
		signale.success(`Finished building '${ path }'`)
	} catch (error) {
		signale.fatal(error)
		process.exit(1)
	}
}

module.exports = {
	index,
	styles,
	scripts,
	tracker,
	build,
}