'use strict'

const Event = require('../models/Event')
const sortByProp = require('../utils/sortByProp')

const response = (entry) => ({
	id: entry.id,
	title: entry.title,
	type: entry.type,
	created: entry.created,
	updated: entry.updated
})

const add = async (data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Event.create(data)
	)

}

const all = async () => {

	const enhance = (entries) => {
		return entries
			.map(response)
			.sort(sortByProp('title'))
	}

	return enhance(
		await Event.find({})
	)

}

const get = async (id) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Event.findOne({ id })
	)

}

const update = async (id, data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Event.findOneAndUpdate({
			id
		}, {
			$set: {
				title: data.title,
				type: data.type,
				updated: Date.now()
			}
		}, {
			new: true
		})
	)

}

const del = async (id) => {

	return Event.findOneAndDelete({
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