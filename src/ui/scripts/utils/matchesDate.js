export default (day, month, year, date) => {

	const isDay = day === date.getDate()
	const isMonth = month === date.getMonth() + 1
	const isYear = year === date.getFullYear()

	return isDay === true && isMonth === true && isYear === true

}