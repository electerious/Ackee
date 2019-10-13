'use strict'

const { day } = require('./times')

module.exports = (offset) => {

	const currentDate = new Date()

	currentDate.setTime(currentDate.getTime() + day * offset)

	return currentDate

}