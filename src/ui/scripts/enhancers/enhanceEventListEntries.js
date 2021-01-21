export default (listEntries = []) => {

	return listEntries.map((listEntry) => ({
		text: listEntry.id,
		count: listEntry.count,
		date: listEntry.created == null ? null : new Date(listEntry.created)
	}))

}