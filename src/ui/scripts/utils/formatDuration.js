const removeLeadingZero = (str) => str.replace(/^0/, '')
const removeTrailingZeros = (str) => str.replace(/(:00:00|:00)$/, '')
const cleanZeros = (str) => removeLeadingZero(removeTrailingZeros(str))

export default (ms) => {

	const date = new Date(ms)
	const duration = date.toISOString().substr(11, 8)

	const hasMinutes = duration.match(/^00:00:/) == null
	const hasHours = duration.match(/^00:/) == null

	if (hasMinutes === false) return {
		toString: () => `${ cleanZeros(duration.substr(6)) }s`,
		value: cleanZeros(duration.substr(6)),
		unit: 's'
	}

	if (hasHours === false) return {
		toString: () => `${ cleanZeros(duration.substr(3)) }m`,
		value: cleanZeros(duration.substr(3)),
		unit: 'm'
	}

	return {
		toString: () => `${ cleanZeros(duration) }h`,
		value: cleanZeros(duration),
		unit: 'h'
	}

}