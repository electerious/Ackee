'use strict'

module.exports = (id, properties) => {

	const aggregate = [
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
			$limit: 25
		}
	]

	properties.forEach((property) => {
		aggregate[0].$match[property] = { $ne: null }
		aggregate[2].$project._id[property] = `$${ property }`
	})

	return aggregate

}