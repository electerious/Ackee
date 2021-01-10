import humanNumber from 'human-number'

export default (num) => {

	const formattedNum = humanNumber(num, (num) => Number.parseFloat(num).toFixed(2))
	const cleanNum = formattedNum.replace('.00', '')

	return cleanNum

}