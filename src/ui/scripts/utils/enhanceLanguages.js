import languageCodes from './languageCodes'

export default (languages) => {

	// Extract and enhance the data from the API
	return languages.map((language) => ({
		text: languageCodes[language.data.id] || language.data.id,
		count: language.data.count,
		date: language.data.created == null ? null : new Date(language.data.created)
	}))

}