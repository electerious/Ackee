'use strict'

const Constant = require('../models/Constant')

const response = (entry) => ({
	id: entry.id,
	name: entry.name,
	value: entry.value,
	unit: entry.unit,
	created: entry.created,
	updated: entry.updated,
})

const enhance = (entry) => {
	return entry == null ? entry : response(entry)
}

const get = async (name) => enhance(
	await Constant.findOne({ name }),
)

const update = async (name, value, unit) => enhance(
	await Constant.findOneAndUpdate({
		name,
	}, {
		$set: {
			updated: Date.now(),
			value,
			unit,
		},
	}, {
		new: true,
		upsert: true,
	}),
)

module.exports = {
	get,
	update,
}