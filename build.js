#!/usr/bin/env node
'use strict'
require('dotenv').config()

const fs = require('fs')

const config = require('./src/utils/config')
const customTracker = require('./src/utils/customTracker')
const { index, styles, scripts, tracker, build } = require('./src/ui/index')

// Build files that are identical on every installation
if (config.isPreBuildMode === true) {
	build('public/index.css', styles)
	build('public/index.js', scripts)
	build('public/tracker.js', tracker)
}

// create dist if needed
if (!fs.existsSync('dist')) fs.mkdirSync('dist')

// copy public files to dist
fs.readdirSync('public').forEach(filename => {
	fs.copyFileSync(`public/${filename}`, `dist/${filename}`)
})

// Build files that depend on environment variables
build(`dist/index.html`, index)
if (customTracker.exists === true) build(`dist/${ customTracker.path }`, tracker)