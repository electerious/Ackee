import * as domains from '../database/domains.js'
import * as records from '../database/records.js'
import blockDemoMode from '../middlewares/blockDemoMode.js'
import requireAuth from '../middlewares/requireAuth.js'
import KnownError from '../utils/KnownError.js'
import pipe from '../utils/pipe.js'
import validated from '../utils/validated.js'

export default {
  Domain: {
    facts: (parent) => parent,
    statistics: (parent) => parent,
  },
  Query: {
    domain: pipe(requireAuth, (parent, { id }) => {
      return domains.get(id)
    }),
    domains: pipe(requireAuth, () => {
      return domains.all()
    }),
  },
  Mutation: {
    createDomain: pipe(requireAuth, blockDemoMode, async (parent, { input }) => {
      const entry = await validated(domains.add(input))

      return {
        payload: entry,
        success: true,
      }
    }),
    updateDomain: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {
      const entry = await validated(domains.update(id, input))

      if (entry == null) {
        throw new KnownError('Unknown domain')
      }

      return {
        payload: entry,
        success: true,
      }
    }),
    deleteDomain: pipe(requireAuth, blockDemoMode, async (parent, { id }) => {
      await records.del(id)
      await domains.del(id)

      return {
        success: true,
      }
    }),
  },
}
