export default (id) => (existingRefs = [], { readField }) => {
	return existingRefs
		.filter((ref) => id !== readField('id', ref))
}