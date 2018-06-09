'use strict'

module.exports = (req, key, value) => {

	if (req.context == null) req.context = {}
	if (key === undefined) return req.context

	req.context[key] = value

}