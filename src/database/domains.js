'use strict'

const Domain = require('../schemas/Domain')

const add = async (data) => {

	return Domain.create(data)

}

const all = async () => {

	return Domain.aggregate([
		{
			$addFields: {
				insensitive: {
					$toLower: '$title'
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

const get = async (id) => {

	return Domain.findOne({
		id
	})

}

const update = async (id, { title }) => {

	return Domain.findOneAndUpdate({
		id
	}, {
		$set: {
			title,
			updated: Date.now()
		}
	}, {
		new: true
	})

}

const del = async (id) => {

	return Domain.findOneAndDelete({
		id
	})

}

module.exports = {
	add,
	all,
	get,
	update,
	del
}