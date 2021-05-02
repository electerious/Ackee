export default (state) => {

	const fetching = (
		state.token.fetching === true
	)

	const errors = [
		state.token.error
	].filter(Boolean)

	return Object.assign({}, state, {
		fetching,
		errors
	})

}