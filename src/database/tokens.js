'use strict'

const Token = require('../schemas/Token')

const add = async () => {

	return Token.create({})

}

const get = async (id) => {

	return Token.findOne({
		id
	})

}

const update = async (id) => {

	return Token.findOneAndUpdate({
		id
	}, {
		$set: {
			updated: Date.now()
		}
	})

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