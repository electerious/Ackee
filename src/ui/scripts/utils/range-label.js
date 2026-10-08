import {
  RANGES_LAST_24_HOURS,
  RANGES_LAST_30_DAYS,
  RANGES_LAST_6_MONTHS,
  RANGES_LAST_7_DAYS,
} from '../../../constants/ranges.js'

export default (range) => {
  return {
    [RANGES_LAST_24_HOURS]: 'Last 24 hours',
    [RANGES_LAST_7_DAYS]: 'Last 7 days',
    [RANGES_LAST_30_DAYS]: 'Last 30 days',
    [RANGES_LAST_6_MONTHS]: 'Last 6 months',
  }[range]
}
