'use strict'

const { day } = require('./times')

module.exports = (offset, date = new Date()) => {

	date.setTime(date.getTime() + day * offset)

	return date

}