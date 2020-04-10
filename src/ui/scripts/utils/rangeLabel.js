import ranges from '../../../constants/ranges'

export default (rangeValue) => {

	return ranges.toArray().find((range) => range.value === rangeValue).label

}