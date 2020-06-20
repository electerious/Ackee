'use strict'

const Domain = require('../schemas/Domain')
const records = require('../database/records')
const aggregateDomains = require('../aggregations/aggregateDomains')
const runUpdate = require('../utils/runUpdate')

const add = async (data) => {

	return Domain.create(data)

}

// TODO: Remove this fn
const all = async () => {

	return Domain.aggregate(aggregateDomains())

}

const get = async (ids) => {

	return Domain.aggregate(aggregateDomains(ids))

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