'use strict'

const Event = require('../schemas/Event')

const add = async (data) => {

	return Event.create(data)

}

const all = async () => {

	return Event.aggregate([
		{
			$addFields: {
				insensitive: {
					$toLower: '$category'
				}
			}
		},
		{
			$sort: {
				insensitive: 1
			}
		}
	])

}

module.exports = {
	add,
	all
}