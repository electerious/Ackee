'use strict'

module.exports = (parent, args, { isAuthenticated }) => {

	if (isAuthenticated !== true) {
		throw isAuthenticated
	}

}