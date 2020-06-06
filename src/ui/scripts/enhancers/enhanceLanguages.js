import languageCodes from '../utils/languageCodes'

export default (languages) => {

	return languages.map((language) => ({
		text: languageCodes[language.data.id.siteLanguage] || language.data.id.siteLanguage,
		count: language.data.count,
		date: language.data.created == null ? null : new Date(language.data.created)
	}))

}