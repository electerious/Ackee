const getText = ({ id }) => {
	if (id.screenHeight && id.screenWidth) return `${ id.screenWidth } x ${ id.screenHeight }px`
	if (id.browserHeight && id.browserWidth) return `${ id.browserWidth } x ${ id.browserHeight }px`
	return `${ id }px`
}

export default (sizes) => sizes.map((size) => ({
	text: getText(size.data),
	count: size.data.count
}))
