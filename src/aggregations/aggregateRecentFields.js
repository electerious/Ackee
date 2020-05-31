'use strict'

module.exports = (id, properties) => {

	const aggregation = [
		{
			$match: {}
		},
		{
			$sort: {
				created: -1
			}
		},
		{
			$project: {
				_id: {},
				created: '$created'
			}
		},
		{
			$limit: 30
		}
	]

	if (id != null) {
		aggregation[0].$match.domainId = id
	}

	properties.forEach((property) => {
		aggregation[0].$match[property] = { $ne: null }
		aggregation[2].$project._id[property] = `$${ property }`
	})

	return aggregation

}