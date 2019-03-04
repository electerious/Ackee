'use strict'

module.exports = (fn) => {

	const output = fn()

	return async () => output

}