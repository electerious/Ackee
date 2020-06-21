'use strict'

const Domain = require('../schemas/Domain')
const records = require('../database/records')
// const aggregateDomains = require('../aggregations/aggregateDomains')
const runUpdate = require('../utils/runUpdate')

const add = async (data) => {

	return Domain.create(data)

}

const all = async () => {

	return Domain.find({})

}

const get = async (id) => {

	return Domain.findOne({
		id
	})

}

const update = async (id, data) => {

	return runUpdate(Domain, id, data, [
		'title'
	])

}

const del = async (id) => {

	await records.del(id)

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