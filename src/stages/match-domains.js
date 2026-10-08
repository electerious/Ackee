export default (ids) => {
  const stage = {
    $match: {},
  }

  if (ids != null) {
    stage.$match.domainId = {
      $in: ids,
    }
  }

  return stage
}
