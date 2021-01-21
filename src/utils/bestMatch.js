'use strict'

module.exports = (matches, fallback) => {

	// Find the first item that only consists if defined values
	const result = matches.reduce((prev, [ key, values ]) => {
		return values.every(Boolean) === true && prev == null ? key : prev
	}, undefined)

	if (result != null) {
		return result
	}

	if (fallback != null) {
		return fallback
	}

}