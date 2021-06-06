export default (sizes = []) => {
	return sizes.map((size) => ({
		text: size.value,
		count: size.count,
		date: size.created == null ? null : new Date(size.created),
	}))
}