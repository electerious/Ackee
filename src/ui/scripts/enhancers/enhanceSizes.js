import bestMatch from '../utils/bestMatch'

const getText = ({ id }) => {

	return bestMatch([
		[ `${ id.screenWidth }px x ${ id.screenHeight }px`, [ id.screenWidth, id.screenHeight ]],
		[ `${ id.browserWidth }px x ${ id.browserHeight }px`, [ id.browserWidth, id.browserHeight ]],
		[ `${ id.screenWidth }px`, [ id.screenWidth ]],
		[ `${ id.screenHeight }px`, [ id.screenHeight ]],
		[ `${ id.browserWidth }px`, [ id.browserWidth ]],
		[ `${ id.browserHeight }px`, [ id.browserHeight ]]
	])

}

export default (sizes) => {

	return sizes.map((size) => ({
		text: getText(size.data),
		count: size.data.count
	}))

}