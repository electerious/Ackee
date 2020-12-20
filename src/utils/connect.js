'use strict'

const mongoose = require('mongoose')

module.exports = (dbUrl) => mongoose.connect(dbUrl, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	connectTimeoutMS: 60000
})