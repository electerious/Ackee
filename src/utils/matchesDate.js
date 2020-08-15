module.exports = (day, month, year, date) => {

	const isDay = day === date.getDate() || day == null
	const isMonth = month === date.getMonth() + 1 || month == null
	const isYear = year === date.getFullYear() || year == null

	return isDay === true && isMonth === true && isYear === true

}