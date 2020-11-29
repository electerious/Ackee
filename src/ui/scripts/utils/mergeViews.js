import enhanceViews from '../enhancers/enhanceViews'

// Turns the views of multiple widgets into one array of views
export default (widgets) => {

	// Enhance views for all widgets
	const enhancedViews = widgets.map((widget) => {

		console.log(widget)
		return enhanceViews(widget.value, 14)

	})

	// Merge all views to one array of views
	return enhancedViews.reduce((acc, views) => {

		// Views is an array. Each item represents the visit count of one day, month or year.
		views.forEach((view, index) => {

			// The current day, month or year might be new and should be initialised first
			const initial = acc[index] == null ? 0 : acc[index]

			// Add the current day, month or year to the global array of days, months or years
			acc[index] = initial + view

		})

		return acc

	}, [])

}