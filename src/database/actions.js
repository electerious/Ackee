'use strict'

const Action = require('../models/Action')

const response = (entry) => ({
	id: entry.id,
	key: entry.key,
	value: entry.value,
	details: entry.details,
	created: entry.created,
	updated: entry.updated
})

const add = async (data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Action.create(data)
	)

}

const update = async (id, data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Action.findOneAndUpdate({
			id
		}, {
			$set: {
				key: data.key,
				value: data.value,
				details: data.details,
				updated: Date.now()
			}
		}, {
			new: true
		})
	)

}

const del = async (eventId) => {

	return Action.deleteMany({
		eventId
	})

}

module.exports = {
	add,
	update,
	del
}