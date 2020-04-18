import { initialSubState } from '../reducers/durations'

export default (state, domainId) => {
	const value = state.durations.value[domainId]
	return value == null ? initialSubState() : value
}