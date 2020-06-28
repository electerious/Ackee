import createArray from '../utils/createArray'

// TODO: Remove interval argument from fn calls
// TODO: Code could be better
export default (durations, length) => createArray(length).map((_, index) => {

	return durations[index].count

})