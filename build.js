#!/usr/bin/env node
'use strict'
require('dotenv').config()

const customTracker = require('./src/utils/customTracker')
const { scripts, tracker, build } = require('./src/ui/index')

// Build files that depend on environment variables of the installation
build('dist/index.js', scripts)
if (customTracker.exists === true) build(`dist/${ customTracker.path }`, tracker)