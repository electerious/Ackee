export default (offset, date = new Date()) => {

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24

	date.setTime(date.getTime() + day * offset)

	return date

}