export default (state) => {

	const fetching = (
		Object.values(state.widgets.value).some((value) => value.fetching) === true ||
		state.token.fetching === true
	)

	const errors = [
		state.widgets.error,
		state.token.error
	].filter(Boolean)

	return Object.assign({}, state, {
		fetching,
		errors
	})

}