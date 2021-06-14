'use strict'

module.exports = (prop) => (a, b) => {
	const _a = String(a[prop])
	const _b = String(b[prop])

	return _a.localeCompare(_b, 'en', { numeric: true })
}