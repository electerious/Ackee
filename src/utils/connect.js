'use strict'

const mongoose = require('mongoose')

module.exports = (dbUrl) => mongoose.connect(dbUrl, {
	connectTimeoutMS: 60000,
})