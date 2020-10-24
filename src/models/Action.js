'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid').v4

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	eventId: {
		type: String,
		required: true,
		index: true
	},
	key: {
		type: String
	},
	value: {
		type: Number,
		required: true
	},
	details: {
		type: String
	},
	created: {
		type: Date,
		required: true,
		index: true,
		default: Date.now
	},
	updated: {
		type: Date,
		required: true,
		index: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Action', schema)