'use strict'

module.exports = (errors) => {

	const message = (key) => errors[key].message

	return Object.keys(errors).map(message).join('\n')

}