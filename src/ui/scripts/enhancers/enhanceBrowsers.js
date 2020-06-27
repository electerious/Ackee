export default (browsers) => {

	return browsers.map((browser) => ({
		text: browser.data.id,
		count: browser.data.count,
		date: browser.data.created == null ? null : new Date(browser.data.created)
	}))

}