'use strict'

const { resolve } = require('path')
const { readFile } = require('fs').promises
const sass = require('rosid-handler-sass')
const js = require('rosid-handler-js')

const html = require('../ui/index')

const isDemoMode = require('../utils/isDemoMode')
const isDevelopmentMode = require('../utils/isDevelopmentMode')

const index = () => {

	const data = html()

	return async (req, res) => {

		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.end(await data)

	}

}

const favicon = () => {

	const filePath = resolve(__dirname, '../ui/images/favicon.ico')
	const data = readFile(filePath)

	return async (req, res) => {

		res.setHeader('Content-Type', 'image/vnd.microsoft.icon')
		res.end(await data)

	}

}

const styles = () => {

	const filePath = resolve(__dirname, '../ui/styles/index.scss')
	const data = sass(filePath, { optimize: isDevelopmentMode === false })

	return async (req, res) => {

		res.setHeader('Content-Type', 'text/css; charset=utf-8')
		res.end(await data)

	}

}

const scripts = () => {

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

	const data = js(filePath, {
		optimize: isDevelopmentMode === false,
		env: {
			ACKEE_TRACKER: process.env.ACKEE_TRACKER,
			ACKEE_DEMO: isDemoMode === true ? 'true' : 'false',
			NODE_ENV: isDevelopmentMode === true ? 'development' : 'production'
		},
		babel
	})

	return async (req, res) => {

		res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
		res.end(await data)

	}

}

const tracker = () => {

	const filePath = require.resolve('ackee-tracker')
	const data = readFile(filePath, 'utf8')

	return async (req, res) => {

		res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		res.end(await data)

	}

}

module.exports = {
	index: isDevelopmentMode === true ? (req, res) => index()(req, res) : index(),
	favicon: isDevelopmentMode === true ? (req, res) => favicon()(req, res) : favicon(),
	styles: isDevelopmentMode === true ? (req, res) => styles()(req, res) : styles(),
	scripts: isDevelopmentMode === true ? (req, res) => scripts()(req, res) : scripts(),
	tracker: isDevelopmentMode === true ? (req, res) => tracker()(req, res) : tracker()
}