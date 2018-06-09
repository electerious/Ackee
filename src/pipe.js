'use strict'

module.exports = (...args) => {

	return [].slice.call(args, 1).reduce((a, b) => {
		return (...args) => Promise.resolve(a(...args)).then((res) => {
			if (res == null) return b(...args)
			return res
		})
	}, args[0])

}