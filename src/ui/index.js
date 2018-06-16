'use strict'

const layout = require('./utils/layout')

module.exports = () => {

	return layout('<div id="main"></div>', [ 'index.css' ], [ 'index.js' ])

}