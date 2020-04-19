import { initialSubState } from '../reducers/devices'

export default (state, domainId) => {
	const value = state.devices.value[domainId]
	return value == null ? initialSubState() : value
}