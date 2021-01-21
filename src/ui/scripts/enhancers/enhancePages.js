export default (pages = []) => {

	return pages.map((page) => ({
		url: new URL(page.id),
		text: new URL(page.id).href,
		count: page.count,
		date: page.created == null ? null : new Date(page.created)
	}))

}