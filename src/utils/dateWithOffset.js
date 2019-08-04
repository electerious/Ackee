'use strict'

const day = require('./day')

module.exports = (offset, date = new Date()) => {

	date.setTime(date.getTime() + day * offset)

	return date

}