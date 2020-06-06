import humanNumber from 'human-number'

export default (num) => {

	return humanNumber(num, (n) => Number.parseFloat(n).toFixed(1))
		.replace('.0', '')

}