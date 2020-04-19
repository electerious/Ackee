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

module.exports = mongoose.model('Token', schema)