export default (languages = []) => {

	return languages.map((language) => ({
		text: language.id,
		count: language.count,
		date: language.created == null ? null : new Date(language.created)
	}))

}