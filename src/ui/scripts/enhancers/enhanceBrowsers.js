export default (browsers = []) => {
	return browsers.map((browser) => ({
		text: browser.value,
		count: browser.count,
		date: browser.created == null ? null : new Date(browser.created),
	}))
}