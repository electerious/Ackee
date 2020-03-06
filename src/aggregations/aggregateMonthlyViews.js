'use strict'

module.exports = (id, unique) => {

	const aggregation = [
		{
			$match: {
				domainId: id
			}
		},
		{
			$group: {
				_id: {
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
			$sort: {
				'_id.year': -1,
				'_id.month': -1
			}
		},
		{
			$limit: 14
		}
	]

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	return aggregation

}