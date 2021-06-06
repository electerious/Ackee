export default (pages = []) => {
	return pages.map((page) => ({
		url: new URL(page.value),
		text: new URL(page.value).href,
		count: page.count,
		date: page.created == null ? null : new Date(page.created),
	}))
}