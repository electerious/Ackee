export default (browsers) => browsers.map((browser) => ({
	text: browser.data.id.browserVersion ? `${ browser.data.id.browserName } ${ browser.data.id.browserVersion }` : browser.data.id,
	count: browser.data.count,
	date: browser.data.created == null ? null : new Date(browser.data.created)
}))

