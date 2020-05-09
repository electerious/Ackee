import { initialSubState } from '../reducers/languages'

export default (state, domainId) => {
	const value = state.languages.value[domainId]
	return value == null ? initialSubState() : value
}