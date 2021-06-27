import createArray from '../../../utils/createArray'
import sortByProp from '../../../utils/sortByProp'

export default (domains = [], length) => {
	// Ensure that each day has at least an empty list
	const base = createArray(length).map(() => [])

	return domains.reduce((acc, domain) => {
		domain.statistics.views.forEach((view, index) => {
			const existingItems = acc[index]
			const newItem = { text: domain.title, count: view.count }

			// Set items, sort items and reverse them, because it should be a desc sorting
			acc[index] = [ ...existingItems, newItem ]
				.sort(sortByProp('count'))
				.reverse()
		})

		return acc
	}, base)
}