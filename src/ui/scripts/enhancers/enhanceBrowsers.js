const getText = ({ id }) => {

	const isWithVersion = id.browserVersion != null

	if (isWithVersion === true) return `${ id.browserName } ${ id.browserVersion }`

	return id

}

export default (browsers) => {

	// Extract and enhance the data from the API
	return browsers.map((browser) => ({
		text: getText(browser.data),
		count: browser.data.count,
		date: browser.data.created == null ? null : new Date(browser.data.created)
	}))

}