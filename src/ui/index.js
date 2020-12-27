'use strict'

const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises

const layout = require('../utils/layout')
const isDemoMode = require('../utils/isDemoMode')
const isDevelopmentMode = require('../utils/isDevelopmentMode')
const customTracker = require('../utils/customTracker')
const signale = require('../utils/signale')

const index = async () => {

	return layout('<div id="main"></div>', 'favicon.ico', [ 'index.css' ], [ 'index.js' ], {
		isDemoMode,
		isDevelopmentMode,
		customTracker
	})

}

const styles = async () => {

	const sass = require('rosid-handler-sass')
	const filePath = resolve(__dirname, './styles/index.scss')

	return sass(filePath, { optimize: isDevelopmentMode === false })

}

const scripts = async () => {

	const js = require('rosid-handler-js-next')
	const filePath = resolve(__dirname, './scripts/index.js')

	return js(filePath, {
		optimize: isDevelopmentMode === false,
		replace: {
			'process.env.ACKEE_TRACKER': JSON.stringify(process.env.ACKEE_TRACKER),
			'process.env.ACKEE_DEMO': JSON.stringify(isDemoMode === true ? 'true' : 'false')
		},
		nodeGlobals: isDevelopmentMode === true,
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

module.exports = {
	index,
	styles,
	scripts,
	tracker,
	build
}