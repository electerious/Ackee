import createArray from '../../../utils/create-array.js'

export default (durations = [], length) =>
  createArray(length).map((_, index) => {
    const duration = durations[index]

    return duration == null ? 0 : duration.count
  })
