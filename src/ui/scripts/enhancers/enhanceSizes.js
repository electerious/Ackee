const getText = ({ id }) => {

	const isScreenResolution = id.screenHeight != null && id.screenWidth != null
	const isBrowserResolution = id.screenHeight != null && id.screenWidth != null

	if (isScreenResolution === true) return `${ id.screenWidth } x ${ id.screenHeight }px`
	if (isBrowserResolution === true) return `${ id.browserWidth } x ${ id.browserHeight }px`

	return `${ id }px`

}

export default (sizes) => {

	// Extract and enhance the data from the API
	return sizes.map((size) => ({
		text: getText(size.data),
		count: size.data.count
	}))

}