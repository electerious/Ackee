export default (ids) => {
  const stage = {
    $match: {},
  }

  if (ids != null) {
    stage.$match.eventId = {
      $in: ids,
    }
  }

  return stage
}
