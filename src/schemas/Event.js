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
	category: {
		type: String,
		required: true
	},
	action: {
		type: String,
		required: true
	},
	label: {
		type: String
	},
	value: {
		type: String
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Event', schema)