import getBrowsers from '../database/browsers.js'
import getDevices from '../database/devices.js'
import getDurations from '../database/durations.js'
import getLanguages from '../database/languages.js'
import getPages from '../database/pages.js'
import getReferrers from '../database/referrers.js'
import getSizes from '../database/sizes.js'
import getSystems from '../database/systems.js'
import getViews from '../database/views.js'
import requireAuth from '../middlewares/require-auth.js'
import domainIds from '../utils/domain-ids.js'
import pipe from '../utils/pipe.js'
import recursiveId from '../utils/recursive-id.js'

export default {
  DomainStatistics: {
    id: pipe(requireAuth, async (domain) => {
      const ids = await domainIds(domain)

      // Provide a static fallback id when there're no domains to create a recursive id from
      if (ids.length === 0) return 'eaf55ae8-29b8-448f-b45c-85e17fbfc8ba'

      return recursiveId(ids)
    }),
    views: pipe(requireAuth, async (domain, { type, interval, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getViews(ids, type, interval, limit, dateDetails)
    }),
    pages: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getPages(ids, sorting, range, limit, dateDetails)
    }),
    referrers: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getReferrers(ids, sorting, type, range, limit, dateDetails)
    }),
    durations: pipe(requireAuth, async (domain, { interval, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getDurations(ids, interval, limit, dateDetails)
    }),
    systems: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getSystems(ids, sorting, type, range, limit, dateDetails)
    }),
    devices: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getDevices(ids, sorting, type, range, limit, dateDetails)
    }),
    browsers: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getBrowsers(ids, sorting, type, range, limit, dateDetails)
    }),
    sizes: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getSizes(ids, sorting, type, range, limit, dateDetails)
    }),
    languages: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {
      const ids = await domainIds(domain)
      return getLanguages(ids, sorting, range, limit, dateDetails)
    }),
  },
  Query: {
    statistics: () => ({}),
  },
}
