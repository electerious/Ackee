import bestMatch from '../utils/bestMatch'

const getText = ({ id }) => {

	return bestMatch([
		[ `${ id.browserName } ${ id.browserVersion }`, [ id.browserName, id.browserVersion ]],
		[ `${ id.browserName }`, [ id.browserName ]]
	])

}

export default (browsers) => {

	// Extract and enhance the data from the API
	return browsers.map((browser) => ({
		text: getText(browser.data),
		count: browser.data.count,
		date: browser.data.created == null ? null : new Date(browser.data.created)
	}))

}