import createArray from '../../../utils/createArray'

export default (views = [], length) => createArray(length).map((_, index) => {

	const view = views[index]

	return view == null ? 0 : view.count

})