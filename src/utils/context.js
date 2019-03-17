'use strict'

module.exports = (obj, key, value) => {

	if (obj.context == null) obj.context = {}
	if (key === undefined) return obj.context

	obj.context[key] = value

	return obj.context

}