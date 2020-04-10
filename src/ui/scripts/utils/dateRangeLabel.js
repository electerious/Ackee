import { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } from '../../../constants/dateRange'

export default (dateRange) => {

	return [ LAST_7_DAYS, LAST_30_DAYS, ALL_TIME ].find((range) => range.value === dateRange).label

}