import isDefined from '../../../utils/isDefined'

export default (state) => {

	const fetching = (
		Object.values(state.views.value).some((value) => value.fetching) === true ||
		Object.values(state.pages.value).some((value) => value.fetching) === true ||
		Object.values(state.referrers.value).some((value) => value.fetching) === true ||
		Object.values(state.durations.value).some((value) => value.fetching) === true ||
		Object.values(state.languages.value).some((value) => value.fetching) === true ||
		Object.values(state.countries.value).some((value) => value.fetching) === true ||
		Object.values(state.sizes.value).some((value) => value.fetching) === true ||
		state.domains.fetching === true ||
		state.token.fetching === true
	)

	const errors = [
		...Object.values(state.views.value).map((value) => value.error),
		...Object.values(state.pages.value).map((value) => value.error),
		...Object.values(state.referrers.value).map((value) => value.error),
		...Object.values(state.durations.value).map((value) => value.error),
		...Object.values(state.languages.value).map((value) => value.error),
		...Object.values(state.countries.value).map((value) => value.error),
		...Object.values(state.sizes.value).map((value) => value.error),
		state.domains.error,
		state.token.error
	].filter(isDefined)

	return Object.assign({}, state, {
		fetching,
		errors
	})

}