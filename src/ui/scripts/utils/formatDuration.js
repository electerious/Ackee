const removeLeadingZero = (str) => str.replace(/^0/, '')
const removeTrailingZeros = (str) => str.replace(/:00$/, '')
const cleanZeros = (str) => removeLeadingZero(removeTrailingZeros(str))

export default (ms) => {

	const date = new Date(ms)
	const duration = date.toISOString().substr(11, 8)

	const hasMinutes = duration.match(/^00:00:/) == null
	if (hasMinutes === false) return `${ cleanZeros(duration.substr(6)) }sec`

	const hasHours = duration.match(/^00:/) == null
	if (hasHours === false) return `${ cleanZeros(duration.substr(3)) }min`

	return `${ cleanZeros(duration) }hrs`

}