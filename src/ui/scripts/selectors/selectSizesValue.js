import { initialSubState } from '../reducers/sizes'

export default (state, domainId) => {
	const value = state.sizes.value[domainId]
	return value == null ? initialSubState() : value
}