'use strict'

const PermanentToken = require('../models/PermanentToken')
const sortByProp = require('../utils/sortByProp')

const response = (entry) => ({
	id: entry.id,
	title: entry.title,
	created: entry.created,
	updated: entry.updated
})

const add = async (data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await PermanentToken.create({
			title: data.title
		})
	)

}

const all = async () => {

	const enhance = (entries) => {
		return entries
			.map(response)
			.sort(sortByProp('title'))
	}

	return enhance(
		await PermanentToken.find({})
	)

}

const get = async (id) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await PermanentToken.findOne({ id })
	)

}

const update = async (id, data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await PermanentToken.findOneAndUpdate({
			id
		}, {
			$set: {
				title: data.title,
				updated: Date.now()
			}
		}, {
			new: true
		})
	)

}

const del = async (id) => {

	return PermanentToken.findOneAndDelete({
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