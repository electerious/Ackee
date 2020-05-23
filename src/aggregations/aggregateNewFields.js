'use strict'

module.exports = (id, properties) => {

	const aggregate = [
		{
			$match: {
				domainId: id
			}
		},
		{
			$group: {
				_id: {},
				count: {
					$sum: 1
				},
				created: {
					$first: '$created'
				}
			}
		},
		{
			$sort: {
				created: -1
			}
		},
		{
			$limit: 30
		}
	]

	properties.forEach((property) => {
		aggregate[0].$match[property] = { $ne: null }
		aggregate[1].$group._id[property] = `$${ property }`
	})

	return aggregate

}