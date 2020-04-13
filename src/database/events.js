'use strict'

const Event = require('../schemas/Event')

const add = async (data) => {

	return Event.create(data)

}

const get = async (id) => {
	console.log(id)
	return Event.aggregate([
		{
			$match: {
				domainId: id
			}
		},
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
	get
}