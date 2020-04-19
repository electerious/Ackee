import { initialSubState } from '../reducers/referrers'

export default (state, domainId) => {
	const value = state.referrers.value[domainId]
	return value == null ? initialSubState() : value
}