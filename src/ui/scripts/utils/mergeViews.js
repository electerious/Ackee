import enhanceViews from './enhanceViews'
import isDefined from './isDefined'

// Turns the views of multiple domains into one array of views
export default (domains, views) => {

	// Enhance all view for all domains
	const enhancedViews = domains.value.map((domain) => {

		const view = views.value[domain.data.id]
		const exists = view != null

		return exists === true ? enhanceViews(view.value, 14) : undefined

	})

	// Remove views of domains that are still loading
	const filteredViews = enhancedViews.filter(isDefined)

	// Merge all views to one array of views
	return filteredViews.reduce((acc, views) => {

		// Views is an array. Each item represents the visit count of one day.
		views.forEach((view, index) => {

			// The current day might be new as should be initialised first
			const initial = acc[index] == null ? 0 : acc[index]

			// Add the current day to the global array of days
			acc[index] = initial + view

		})

		return acc

	}, [])

}