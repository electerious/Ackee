'use strict'

module.exports = (prop) => (a, b) => {

	const _a = a[prop]
	const _b = b[prop]

	return _a.localeCompare(_b, 'en', { numeric: true })

}