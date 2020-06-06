'use strict'

const matchDomainId = require('../stages/matchDomainId')

module.exports = (id, unique) => {

	const aggregation = [
		matchDomainId(id),
		{
			$group: {
				_id: {
					day: {
						$dayOfMonth: '$created'
					},
					month: {
						$month: '$created'
					},
					year: {
						$year: '$created'
					}
				},
				count: {
					$sum: 1
				}
			}
		},
		{
			$group: {
				_id: null,
				average: {
					$avg: '$count'
				}
			}
		},
		{
			$project: {
				_id: false,
				average: '$average'
			}
		}
	]

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	return aggregation

}