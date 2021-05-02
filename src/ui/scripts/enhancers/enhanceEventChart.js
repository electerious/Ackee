import createArray from '../../../utils/createArray'

export default (chartEntries = [], length) => createArray(length).map((_, index) => {

	const chartEntry = chartEntries[index]

	return chartEntry == null ? 0 : chartEntry.count

})