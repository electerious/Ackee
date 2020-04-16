import countryCodes from '../utils/countryCodes'

export default (countries) => {

	// Extract and enhance the data from the API
	return countries.map((country) => ({
		text: countryCodes[country.data.id] || country.data.id,
		count: country.data.count,
		date: country.data.created == null ? null : new Date(country.data.created)
	}))

}