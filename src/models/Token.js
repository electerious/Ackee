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
	title: {
		type: String
	},
	permanent: {
		type: Boolean,
		required: true,
		default: false
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
