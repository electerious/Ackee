import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import { VIEWS_TYPE_UNIQUE } from '../constants/views.js'
import getDurations from '../database/durations.js'
import getActiveVisitors from '../database/facts.js'
import getViews from '../database/views.js'
import requireAuth from '../middlewares/require-auth.js'
import domainIds from '../utils/domain-ids.js'
import pipe from '../utils/pipe.js'
import recursiveId from '../utils/recursive-id.js'

export default {
  AverageViews: {
    count: pipe(requireAuth, (entries) => {
      const totalCount = entries.slice(1, 15).reduce((acc, entry) => acc + entry.count, 0)

      return Math.round(totalCount / 14)
    }),
    change: pipe(requireAuth, (entries) => {
      const totalCountCurrent = entries.slice(1, 8).reduce((acc, entry) => acc + entry.count, 0)
      const totalCountPrevious = entries.slice(8, 15).reduce((acc, entry) => acc + entry.count, 0)
      const totalDifference = totalCountCurrent - totalCountPrevious

      if (totalCountPrevious === 0) return

      return Math.min(Math.max(Math.round((totalDifference / totalCountPrevious) * 100), -100), 100)
    }),
  },
  AverageDuration: {
    count: pipe(requireAuth, (entries) => {
      const totalCount = entries.slice(1, 15).reduce((acc, entry) => acc + entry.count, 0)

      return Math.round(totalCount / 14)
    }),
    change: pipe(requireAuth, (entries) => {
      const totalCountCurrent = entries.slice(1, 8).reduce((acc, entry) => acc + entry.count, 0)
      const totalCountPrevious = entries.slice(8, 15).reduce((acc, entry) => acc + entry.count, 0)
      const totalDifference = totalCountCurrent - totalCountPrevious

      if (totalCountPrevious === 0) return

      return Math.min(Math.max(Math.round((totalDifference / totalCountPrevious) * 100), -100), 100)
    }),
  },
  Facts: {
    id: pipe(requireAuth, async (domain) => {
      const ids = await domainIds(domain)

      // Provide a static fallback id when there're domains to create a recursive id from
      if (ids.length === 0) return '882b8e8a-f30b-414d-85e1-00d8ed5585a6'

      return recursiveId(ids)
    }),
    activeVisitors: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const ids = await domainIds(domain)
      const activeVisitors = await getActiveVisitors(ids, dateDetails)

      return activeVisitors
    }),
    averageViews: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const ids = await domainIds(domain)
      const entries = getViews(ids, VIEWS_TYPE_UNIQUE, INTERVALS_DAILY, 15, dateDetails)

      return entries
    }),
    averageDuration: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const ids = await domainIds(domain)
      const entries = getDurations(ids, INTERVALS_DAILY, 15, dateDetails)

      return entries
    }),
    viewsToday: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const ids = await domainIds(domain)
      const entries = await getViews(ids, VIEWS_TYPE_UNIQUE, INTERVALS_DAILY, 1, dateDetails)

      return entries[0].count
    }),
    viewsMonth: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const ids = await domainIds(domain)
      const entries = await getViews(ids, VIEWS_TYPE_UNIQUE, INTERVALS_MONTHLY, 1, dateDetails)

      return entries[0].count
    }),
    viewsYear: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const ids = await domainIds(domain)
      const entries = await getViews(ids, VIEWS_TYPE_UNIQUE, INTERVALS_YEARLY, 1, dateDetails)

      return entries[0].count
    }),
  },
  Query: {
    facts: () => ({}),
  },
}
