import createArray from '../../../utils/createArray'

// TODO: Avoid that this functions runs that may times
export default (durations, length) => createArray(length).map((_, index) => {

	const duration = durations[index]

	return duration == null ? 0 : duration.count

})