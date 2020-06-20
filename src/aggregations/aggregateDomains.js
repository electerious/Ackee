'use strict'

const matchIds = require('../stages/matchIds')

module.exports = (ids) => {

	const aggregation = [
		matchIds(ids),
		{
			$addFields: {
				insensitive: {
					$toLower: '$title'
				}
			}
		},
		{
			$sort: {
				insensitive: 1
			}
		}
	]

	return aggregation

}