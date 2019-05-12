'use strict'

const Record = require('../schemas/Record')

const add = async (data) => {

	return Record.create(data)

}

const update = async (id) => {

	return Record.findOneAndUpdate({
		id
	}, {
		$set: {
			updated: Date.now()
		}
	}, {
		new: true
	})

}

module.exports = {
	add,
	update
}