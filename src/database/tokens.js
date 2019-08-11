'use strict'

const Token = require('../schemas/Token')
const runUpdate = require('../utils/runUpdate')

const add = async () => {

	return Token.create({})

}

const get = async (id) => {

	return Token.findOne({
		id
	})

}

const update = async (id) => {

	return runUpdate(Token, id)

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