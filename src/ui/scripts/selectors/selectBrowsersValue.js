import { initialSubState } from '../reducers/browsers'

export default (state, domainId) => {
	const value = state.browsers.value[domainId]
	return value == null ? initialSubState() : value
}