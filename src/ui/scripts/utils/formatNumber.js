import humanNumber from 'human-number'

export default (num) => {

	const roundedNum = Math.round(num)
	const formattedNum = humanNumber(roundedNum, (num) => Number.parseFloat(num).toFixed(1))
	const cleanNum = formattedNum.replace('.0', '')

	return cleanNum

}