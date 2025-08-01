'use strict'

const mongoose = require('mongoose')
const uuid = require('crypto').randomUUID

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid(),
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updated: {
		type: Date,
		required: true,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	value: {
		type: Number,
		required: true,
	},
	unit: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Constant', schema)