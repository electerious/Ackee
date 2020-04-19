import { initialSubState } from '../reducers/views'

export default (state, domainId) => {
	const value = state.views.value[domainId]
	return value == null ? initialSubState() : value
}