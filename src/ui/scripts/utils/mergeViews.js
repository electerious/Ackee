import enhanceViews from '../enhancers/enhanceViews'
import isDefined from '../../../utils/isDefined'

// Turns the views of multiple domains into one array of views
export default (domains, views) => {

	// Enhance views for all domains
	const enhancedViews = domains.value.map((domain) => {

		const view = views.value[domain.data.id]
		const exists = view != null

		return exists === true ? enhanceViews(view.value, 14, views.interval) : undefined

	})

	// Remove views of domains that are still loading
	const filteredViews = enhancedViews.filter(isDefined)

	// Merge all views to one array of views
	return filteredViews.reduce((acc, views) => {

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