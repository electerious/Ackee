'use strict'

const layout = require('./scripts/utils/layout')

module.exports = () => {

	return layout('<div id="main"></div>', [ 'index.css' ], [ 'index.js' ])

}