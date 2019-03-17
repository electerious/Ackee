import day from '../../../day'

export default (offset, date = new Date()) => {

	date.setTime(date.getTime() + day * offset)

	return date

}