'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	created: {
		type: Number,
		default: Date.now
	},
	updated: {
		type: Number,
		default: Date.now
	}
})

module.exports = mongoose.model('Token', schema)