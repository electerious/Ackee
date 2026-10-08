export default () => {
  // The time that elapsed between the creation and updating of records.
  return {
    $project: {
      created: '$created',
      duration: {
        $subtract: ['$updated', '$created'],
      },
    },
  }
}
