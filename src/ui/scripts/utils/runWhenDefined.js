import isDefined from '../../../utils/isDefined'

export default (fn, ...args) => {

	if (fn == null) return
	if (args.every(isDefined) === false) return

	return fn(...args)

}