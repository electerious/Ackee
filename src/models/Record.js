'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid').v4
const isUrl = require('is-url')

const isNullOrUrl = (value) => value == null || isUrl(value)

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	clientId: {
		type: String,
		index: true
	},
	domainId: {
		type: String,
		required: true,
		index: true
	},
	siteLocation: {
		type: String,
		required: true,
		validate: isUrl
	},
	siteReferrer: {
		type: String,
		validate: isNullOrUrl
	},
	siteLanguage: {
		type: String,
		minlength: 2,
		maxlength: 2
	},
	source: {
		type: String
	},
	screenWidth: {
		type: Number,
		min: 0,
		max: 100000
	},
	screenHeight: {
		type: Number,
		min: 0,
		max: 100000
	},
	screenColorDepth: {
		type: Number,
		min: 1,
		max: 48
	},
	deviceName: {
		type: String
	},
	deviceManufacturer: {
		type: String
	},
	osName: {
		type: String
	},
	osVersion: {
		type: String
	},
	browserName: {
		type: String
	},
	browserVersion: {
		type: String
	},
	browserWidth: {
		type: Number,
		min: 0,
		max: 100000
	},
	browserHeight: {
		type: Number,
		min: 0,
		max: 100000
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

module.exports = mongoose.model('Record', schema)