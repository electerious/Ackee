'use strict'

const mongoose = require('mongoose')

module.exports = (dbUrl) => mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	connectTimeoutMS: 60000,
})