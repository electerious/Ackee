export default (systems) => {

	return systems.map((system) => ({
		text: system.data.id,
		count: system.data.count,
		date: system.data.created == null ? null : new Date(system.data.created)
	}))

}