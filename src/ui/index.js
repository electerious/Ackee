'use strict'

const layout = require('../utils/layout')

module.exports = () => {

	return layout('<div id="main"></div>', 'favicon.ico', [ 'index.css' ], [ 'index.js' ])

}