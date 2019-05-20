import mergeViews from './mergeViews'
import enhanceViews from './enhanceViews'
import isDefined from './isDefined'

const mergedViews = (domains, views) => {

	// Enhance all view for all domains
	const enhancedViews = domains.value.map((domain) => {

		const view = views.value[domain.data.id]
		const exists = view != null

		return exists === true ? enhanceViews(view.value, 14) : undefined

	})

	// Remove views of domains that are still loading
	const filteredViews = enhancedViews.filter(isDefined)

	// Merge all views to one array of views
	return mergeViews(filteredViews)

}

export default (state) => {

	const fetching = (
		Object.keys(state.views.value).some((key) => state.views.value[key].fetching) === true ||
		Object.keys(state.referrers.value).some((key) => state.referrers.value[key].fetching) === true ||
		state.domains.fetching === true ||
		state.token.fetching === true
	)

	const errors = [
		...Object.keys(state.views.value).map((key) => state.views.value[key].error),
		...Object.keys(state.referrers.value).map((key) => state.referrers.value[key].error),
		state.domains.error,
		state.token.error
	].filter(isDefined)

	return Object.assign({}, state, {
		fetching,
		errors,
		merged: {
			views: mergedViews(state.domains, state.views)
		}
	})

}