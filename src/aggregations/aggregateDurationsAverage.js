'use strict'

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

	return aggregation

}