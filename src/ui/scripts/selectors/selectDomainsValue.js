export const byIndex = (state, index) => {
	return state.domains.value[index]
}

export const byId = (state, domainId) => {
	return state.domains.value.find((domain) => domain.id === domainId)
}