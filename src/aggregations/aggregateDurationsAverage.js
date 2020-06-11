'use strict'

const { subDays, startOfDay } = require('date-fns')

const matchDomainId = require('../stages/matchDomainId')
const projectDuration = require('../stages/projectDuration')
const projectMinInterval = require('../stages/projectMinInterval')
const matchLimit = require('../stages/matchLimit')

module.exports = (id) => {

	const aggregation = [
		matchDomainId(id),
		projectDuration(),
		projectMinInterval(),
		matchLimit(),
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
				average: {
					$avg: '$duration'
				}
			}
		},
		{
			$group: {
				_id: null,
				average: {
					$avg: '$average'
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

	aggregation[0].$match.created = { $gte: subDays(startOfDay(new Date()), 13) }

	return aggregation

}