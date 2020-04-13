const getText = ({ id }) => {

	const isScreenResolution = id.screenWidth != null && id.screenHeight != null
	const isBrowserResolution = id.browserWidth != null && id.browserHeight != null

	if (isScreenResolution === true) return `${ id.screenWidth }px x ${ id.screenHeight }px`
	if (isBrowserResolution === true) return `${ id.browserWidth }px x ${ id.browserHeight }px`

	return `${ id }px`

}

export default (sizes) => {

	// Extract and enhance the data from the API
	return sizes.map((size) => ({
		text: getText(size.data),
		count: size.data.count
	}))

}