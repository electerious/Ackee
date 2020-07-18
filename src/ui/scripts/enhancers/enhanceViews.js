import createArray from '../../../utils/createArray'

// TODO: Avoid that this functions runs that may times
export default (views, length) => createArray(length).map((_, index) => {

	const view = views[index]

	return view == null ? 0 : view.count

})