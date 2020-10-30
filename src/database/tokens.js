'use strict'

const Token = require('../models/Token')

const response = (entry) => ({
	id: entry.id,
	title: entry.title,
	permanent: entry.permanent,
	created: entry.created,
	updated: entry.updated
})

const add = async (data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Token.create(data)
	)

}

const get = async (id) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Token.findOne({ id })
	)

}

const update = async (id) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Token.findOneAndUpdate({
			id
		}, {
			$set: {
				updated: Date.now()
			}
		}, {
			new: true
		})
	)

}

const del = async (id) => {

	return Token.findOneAndDelete({
		id
	})

}

module.exports = {
	add,
	get,
	update,
	del
}