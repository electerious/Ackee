import { initialSubState } from '../reducers/pages'

export default (state, domainId) => {
	const value = state.pages.value[domainId]
	return value == null ? initialSubState() : value
}