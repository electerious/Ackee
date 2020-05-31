'use strict'

module.exports = () => {

	const aggregation = [
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