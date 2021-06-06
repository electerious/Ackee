export default (systems = []) => {
	return systems.map((system) => ({
		text: system.value,
		count: system.count,
		date: system.created == null ? null : new Date(system.created),
	}))
}