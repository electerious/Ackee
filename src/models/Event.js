'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid').v4

const isKnownType = (value) => [
	'CHART',
	'LIST'
].includes(value)

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true,
		validate: isKnownType
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	updated: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Event', schema)