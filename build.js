#!/usr/bin/env node
'use strict'
require('dotenv').config()

const { index, styles, scripts, tracker, build } = require('./src/ui/index')

build('dist/index.css', styles)
build('dist/index.js', scripts)
build('dist/tracker.js', tracker)
build(`dist/index.html`, index)