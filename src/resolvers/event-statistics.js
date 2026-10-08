import * as actions from '../database/actions.js'
import requireAuth from '../middlewares/require-auth.js'
import pipe from '../utils/pipe.js'

export default {
  EventStatistics: {
    id: pipe(requireAuth, (event) => {
      return event.id
    }),
    chart: pipe(requireAuth, (event, { type, interval, limit }, { dateDetails }) => {
      const ids = [event.id]
      return actions.getChart(ids, type, interval, limit, dateDetails)
    }),
    list: pipe(requireAuth, (event, { sorting, type, range, limit }, { dateDetails }) => {
      const ids = [event.id]
      return actions.getList(ids, sorting, type, range, limit, dateDetails)
    }),
  },
}
