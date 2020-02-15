export default (sizes) => {

	// Extract and enhance the data from the API
	return sizes.map((size) => ({
		text: `${ size.data.id }px`,
		count: size.data.count
	}))

}