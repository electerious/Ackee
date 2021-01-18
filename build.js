#!/usr/bin/env node
'use strict'
require('dotenv').config()

const { resolve } = require('path')
const { writeFile, readFile } = require('fs').promises
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const html = require('./src/ui/index')
const isDemoMode = require('./src/utils/isDemoMode')
const isDevelopmentMode = require('./src/utils/isDevelopmentMode')
const customTracker = require('./src/utils/customTracker')
const signale = require('./src/utils/signale')

const index = async () => {

	const data = html()

	return data

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

const styles = async () => {

	const filePath = resolve(__dirname, 'src/ui/styles/index.scss')
	const data = sass(filePath, { optimize: isDevelopmentMode === false })

	return data

}

const scripts = async () => {

	const filePath = resolve(__dirname, 'src/ui/scripts/index.js')

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
			NODE_ENV: isDevelopmentMode === true ? 'development' : 'production'
		},
		babel
	})

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

const tracker = async () => {

	const filePath = require.resolve('ackee-tracker')
	const data = readFile(filePath, 'utf8')

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

// Required files
build('dist/index.html', index)
build('dist/favicon.ico', favicon)
build('dist/index.css', styles)
build('dist/index.js', scripts)
build('dist/tracker.js', tracker)
build('dist/icon.png', icon)
build('dist/manifest.webmanifest', manifest)
build('dist/sw.js', sw)

// Optional files
if (customTracker.exists === true) {
	build(`dist/${customTracker.path}`, tracker)
}
