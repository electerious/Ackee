export default (browsers = []) => {

	return browsers.map((browser) => ({
		text: browser.id,
		count: browser.count,
		date: browser.created == null ? null : new Date(browser.created)
	}))

}