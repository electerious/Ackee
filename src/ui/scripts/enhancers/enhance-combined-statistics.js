import createArray from '../../../utils/create-array.js'
import sortByProperty from '../../../utils/sort-by-property.js'

export default (domains = [], length, field) => {
  // Ensure that each day has at least an empty list
  const base = createArray(length).map(() => [])

  return domains.reduce((acc, domain) => {
    const statistics = domain.statistics[field]

    for (const [index, statistic] of statistics.entries()) {
      const existingItems = acc[index]
      const newItem = { text: domain.title, count: statistic.count }

      // Set items, sort items and reverse them, because it should be a desc sorting
      acc[index] = [...existingItems, newItem].toSorted(sortByProperty('count')).toReversed()
    }

    return acc
  }, base)
}
