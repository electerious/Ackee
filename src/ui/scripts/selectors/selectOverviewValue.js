import { initialSubState } from '../reducers/overview'
import genericSubState from '../utils/genericSubState'

export const withoutType = (state, domainId) => {
	const value = state.overview.value[domainId]
	return value == null ? initialSubState() : value
}

export const withType = (state, domainId, type) => {
	const value = withoutType(state, domainId).statistics[type]
	return value == null ? genericSubState().value : value
}