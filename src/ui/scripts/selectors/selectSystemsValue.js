import { initialSubState } from '../reducers/systems'

export default (state, domainId) => {
	const value = state.systems.value[domainId]
	return value == null ? initialSubState() : value
}