import day from '../../../utils/day'

export default (offset, date = new Date()) => {

	date.setTime(date.getTime() + day * offset)

	return date

}