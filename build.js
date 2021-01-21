#!/usr/bin/env node
'use strict'
require('dotenv').config()

const config = require('./src/utils/config')
const customTracker = require('./src/utils/customTracker')
const { index, styles, scripts, tracker, build, sw, manifest } = require('./src/ui/index')

// Build files that are identical on every installation
if (config.isPreBuildMode === true) {
	build('dist/index.css', styles)
	build('dist/index.js', scripts)
	build('dist/tracker.js', tracker)
	build('dist/manifest.webmanifest', manifest)
	build('dist/sw.js', sw)
}

// Build files that depend on environment variables
build(`dist/index.html`, index)
if (customTracker.exists === true) build(`dist/${customTracker.path}`, tracker)
