import formatCompactNumber from './formatCompactNumber'

export default (num) => {
	const roundedNum = Math.round(num)
	return formatCompactNumber(roundedNum, 1)
}