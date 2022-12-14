'use strict'

module.exports = (...args) => {
	return Array.prototype.slice.call(args, 1).reduce((a, b) => {
		return (...args) => Promise.resolve(a(...args)).then((result) => {
			if (result == null) return b(...args)
			return result
		})
	}, args[0])
}