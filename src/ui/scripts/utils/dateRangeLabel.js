import { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } from '../../../constants/dateRange'

export default (dateRangeValue) => {

	return [ LAST_7_DAYS, LAST_30_DAYS, ALL_TIME ].find((range) => range.value === dateRangeValue).label

}