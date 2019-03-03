'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid/v4')
const isURL = require('is-url')

const isNullOrURL = (value) => value == null || isURL(value)

const schema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	domainId: {
		type: String,
		required: true
	},
	siteLocation: {
		type: String,
		required: true,
		validate: isURL
	},
	siteReferrer: {
		type: String,
		validate: isNullOrURL
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
		required: true,
		min: 0,
		max: 100000
	},
	screenHeight: {
		type: Number,
		required: true,
		min: 0,
		max: 100000
	},
	screenColorDepth: {
		type: Number,
		required: true,
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
		required: true,
		min: 0,
		max: 100000
	},
	browserHeight: {
		type: Number,
		required: true,
		min: 0,
		max: 100000
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

module.exports = mongoose.model('Record', schema)