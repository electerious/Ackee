import { DURATIONS_LIMIT } from '../constants/durations.js'

export default () => {
  // Some visitors keep sites open in the background. Their duration is often
  // way above the limit. This distorts the average and should be omitted.
  return {
    $match: {
      duration: {
        $lt: DURATIONS_LIMIT,
      },
    },
  }
}
