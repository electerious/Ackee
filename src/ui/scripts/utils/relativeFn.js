import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../../../constants/intervals'

import relativeDays from './relativeDays'
import relativeMonths from './relativeMonths'
import relativeYears from './relativeYears'

export default (interval) => {
	switch (interval) {
		case INTERVALS_DAILY: return relativeDays
		case INTERVALS_MONTHLY: return relativeMonths
		case INTERVALS_YEARLY: return relativeYears
	}
}