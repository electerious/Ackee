import isDefined from './isDefined'

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
		errors
	})

}