import createArray from '../../../utils/createArray'

export default (durations = [], length) => createArray(length).map((_, index) => {

	const duration = durations[index]

	return duration == null ? 0 : duration.count

})