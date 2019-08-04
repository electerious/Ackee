'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid/v4')
const isUrl = require('is-url')

const isNullOrUrl = (value) => value == null || isUrl(value)

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	identifier: {
		type: String
	},
	domainId: {
		type: String,
		required: true
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
	siteTitle: {
		type: String
	},
	siteLanguage: {
		type: String,
		minlength: 2,
		maxlength: 2
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
		default: Date.now
	},
	updated: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Record', schema)