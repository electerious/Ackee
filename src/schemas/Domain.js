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
	title: {
		type: String
	},
	pattern: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Domain', schema)