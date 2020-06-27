export default (sizes) => {

	return sizes.map((size) => ({
		text: size.data.id,
		count: size.data.count
	}))

}