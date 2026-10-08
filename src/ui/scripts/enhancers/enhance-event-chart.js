import createArray from '../../../utils/create-array.js'

export default (chartEntries = [], length) =>
  createArray(length).map((_, index) => {
    const chartEntry = chartEntries[index]

    return chartEntry == null ? 0 : chartEntry.count
  })
