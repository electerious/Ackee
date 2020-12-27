#!/usr/bin/env node
'use strict'

const { styles, scripts, tracker, build } = require('./src/ui/index')

// Build files that are identical on every installation
build('dist/index.css', styles)
build('dist/index.js', scripts)
build('dist/tracker.js', tracker)