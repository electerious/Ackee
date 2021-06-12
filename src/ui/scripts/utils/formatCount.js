export default (num) => {
	const cleanNum = Number
		.parseFloat(num)
		.toFixed(2)
		.replace('.00', '')

	return cleanNum + 'x'
}