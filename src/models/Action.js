'use strict'

const mongoose = require('mongoose')
const uuid = require('uuid').v4

const totalSumActionSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: uuid
	},
	value: {
		type: Number,
		required: true
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

// const keySumActionSchema = new mongoose.Schema({
// 	id: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 		default: uuid
// 	},
// 	key: {
// 		type: String,
// 		required: true
// 	},
// 	value: {
// 		type: Number,
// 		required: true
// 	},
// 	created: {
// 		type: Date,
// 		required: true,
// 		index: true,
// 		default: Date.now
// 	},
// 	updated: {
// 		type: Date,
// 		required: true,
// 		index: true,
// 		default: Date.now
// 	}
// })

// const logActionSchema = new mongoose.Schema({
// 	id: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 		default: uuid
// 	},
// 	summary: {
// 		type: String,
// 		required: true
// 	},
// 	details: {
// 		type: String,
// 		required: true
// 	},
// 	created: {
// 		type: Date,
// 		required: true,
// 		index: true,
// 		default: Date.now
// 	},
// 	updated: {
// 		type: Date,
// 		required: true,
// 		index: true,
// 		default: Date.now
// 	}
// })

module.exports = {
	TotalSumAction: mongoose.model('TotalSumAction', totalSumActionSchema)
	// KeySumAction: mongoose.model('KeySumAction', keySumActionSchema),
	// LongAction: mongoose.model('LogAction', logActionSchema)
}