'use strict'

const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js-next')

const isDemoMode = require('../utils/isDemoMode')
const isDevelopmentMode = require('../utils/isDevelopmentMode')
const signale = require('../utils/signale')

const styles = async () => {

	const filePath = resolve(__dirname, './styles/index.scss')
	const data = sass(filePath, { optimize: isDevelopmentMode === false })

	return data

}

const scripts = async () => {

	const filePath = resolve(__dirname, './scripts/index.js')

	const data = js(filePath, {
		optimize: isDevelopmentMode === false,
		replace: {
			'process.env.ACKEE_TRACKER': JSON.stringify(process.env.ACKEE_TRACKER),
			'process.env.ACKEE_DEMO': JSON.stringify(isDemoMode === true ? 'true' : 'false')
		},
		nodeGlobals: isDevelopmentMode === true,
		babel: false
	})

	return data

}

const tracker = async () => {

	const filePath = require.resolve('ackee-tracker')
	const data = readFile(filePath, 'utf8')

	return data

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
	styles,
	scripts,
	tracker,
	build
}