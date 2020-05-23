import languageCodes from '../utils/languageCodes'

export default (languages) => {

	// Extract and enhance the data from the API
	return languages.map((language) => ({
		text: languageCodes[language.data.id.siteLanguage] || language.data.id.siteLanguage,
		count: language.data.count,
		date: language.data.created == null ? null : new Date(language.data.created)
	}))

}