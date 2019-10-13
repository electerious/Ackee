'use strict'

const { day } = require('./times')

module.exports = (offset) => {

	const currentDate = new Date()

	currentDate.setHours(0)
	currentDate.setMinutes(0)
	currentDate.setSeconds(0)
	currentDate.setMilliseconds(0)

	currentDate.setTime(currentDate.getTime() + day * offset)

	return currentDate

}