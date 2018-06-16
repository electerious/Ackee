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
	const browserify = {}
	const babel = { babelrc: false, compact: false }
	const opts = { optimize: false, browserify, babel }

	return js(filePath, opts)

}

module.exports = {
	index,
	styles,
	scripts
}