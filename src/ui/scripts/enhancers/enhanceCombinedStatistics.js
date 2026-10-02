import createArray from '../../../utils/createArray.js'
import sortByProperty from '../../../utils/sortByProperty.js'

export default (domains = [], length, field) => {
  // Ensure that each day has at least an empty list
  const base = createArray(length).map(() => [])

  return domains.reduce((acc, domain) => {
    for (const [index, statistic] of domain.statistics[field].entries()) {
      const existingItems = acc[index]
      const newItem = { text: domain.title, count: statistic.count }

      // Set items, sort items and reverse them, because it should be a desc sorting
      acc[index] = [...existingItems, newItem].toSorted(sortByProperty('count')).toReversed()
    }

    return acc
  }, base)
}
