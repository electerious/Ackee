import sortByProp from '../../../../utils/sortByProp'

export default (newRef, prop) => (existingRefs = [], { readField }) => {
	const toObj = (ref) => ({ ref, [prop]: readField(prop, ref) })
	const toRef = (obj) => obj.ref

	return [ ...existingRefs, newRef ]
		.map(toObj)
		.sort(sortByProp(prop))
		.map(toRef)
}