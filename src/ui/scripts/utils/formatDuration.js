export default (ms) => {

	const date = new Date(ms)
	const duration = date.toISOString().substr(11, 8)

	const hasHours = duration.match(/^00:/) == null
	if (hasHours === false) return `${ duration.substr(3) }min`

	return `${ duration }h`

}