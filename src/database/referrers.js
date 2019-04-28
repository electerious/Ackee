'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const getTop = async (id) => {

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				siteReferrer: {
					$ne: null
				},
				created: {
					$gte: dateWithOffset(-7)
				}
			}
		},
		{
			$group: {
				_id: '$siteReferrer',
				count: {
					$sum: 1
				}
			}
		},
		{
			$sort: {
				count: -1
			}
		},
		{
			$limit: 25
		}
	])

}

const getRecent = async (id) => {

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				siteReferrer: {
					$ne: null
				}
			}
		},
		{
			$sort: {
				created: -1
			}
		},
		{
			$project: {
				_id: '$siteReferrer'
			}
		},
		{
			$limit: 25
		}
	])

}

const get = async (id, sorting) => {

	switch (sorting) {
		case 'top': return getTop(id)
		case 'recent': return getRecent(id)
	}

}

module.exports = {
	get
}