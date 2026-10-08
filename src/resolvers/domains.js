import * as domains from '../database/domains.js'
import * as records from '../database/records.js'
import blockDemoMode from '../middlewares/block-demo-mode.js'
import requireAuth from '../middlewares/require-auth.js'
import KnownError from '../utils/known-error.js'
import messages from '../utils/messages.js'
import pipe from '../utils/pipe.js'

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
      let entry

      try {
        entry = await domains.add(input)
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new KnownError(messages(error.errors))
        }

        throw error
      }

      return {
        payload: entry,
        success: true,
      }
    }),
    updateDomain: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {
      let entry

      try {
        entry = await domains.update(id, input)
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new KnownError(messages(error.errors))
        }

        throw error
      }

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
