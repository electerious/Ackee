'use strict'

module.exports = (id, properties) => {

	const aggregation = [
		{
			$match: {
				domainId: id
			}
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

	properties.forEach((property) => {
		aggregation[0].$match[property] = { $ne: null }
		aggregation[2].$project._id[property] = `$${ property }`
	})

	return aggregation

}