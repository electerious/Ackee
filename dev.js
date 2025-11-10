#!/usr/bin/env node
'use strict'

const { execSync } = require('child_process')

// Run the build and start the server
try {
	console.log('Building...')
	execSync('npm run build:pre', { stdio: 'inherit' })
	console.log('Starting server...')
	require('./src/index.js')
} catch (error) {
	console.error('Error during development startup:', error)
	process.exit(1)
}
