import createArray from '../utils/createArray'

// TODO: Remove interval argument from fn calls
// TODO: Code could be better
export default (views, length) => createArray(length).map((_, index) => {

	return views[index].count

})