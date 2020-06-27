export default (languages) => {

	return languages.map((language) => ({
		text: language.data.id,
		count: language.data.count,
		date: language.data.created == null ? null : new Date(language.data.created)
	}))

}