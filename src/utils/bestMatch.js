'use strict'

const isDefined = require('./isDefined')

module.exports = (matches) => {

	// Find the first item that only consists if defined values
	return matches.reduce((prev, [ key, values ]) => {
		return values.every(isDefined) === true && prev == null ? key : prev
	}, undefined)

}