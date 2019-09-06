export default (pageViews) => {

	// Extract and enhance the data from the API
	return pageViews.map((pageView) => ({
		url: new URL(pageView.data.id),
		count: pageView.data.count
	}))

}