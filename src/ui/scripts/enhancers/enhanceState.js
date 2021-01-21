export default (state) => {

	const fetching = (
		Object.values(state.widgets.value).some((value) => value.fetching) === true ||
		state.domains.fetching === true ||
		state.token.fetching === true ||
		state.permanentTokens.fetching === true ||
		state.events.fetching === true
	)

	const errors = [
		state.widgets.error,
		state.domains.error,
		state.token.error,
		state.permanentTokens.error,
		state.events.error
	].filter(Boolean)

	return Object.assign({}, state, {
		fetching,
		errors
	})

}