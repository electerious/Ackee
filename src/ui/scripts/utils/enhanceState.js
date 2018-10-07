export default (state) => {

	const fetching = (
		Object.keys(state.views.value).some((key) => state.views.value[key].fetching) === true ||
		state.domains.fetching === true ||
		state.token.fetching === true
	)

	return Object.assign({}, state, {
		fetching
	})

}