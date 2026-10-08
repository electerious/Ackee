import * as actions from '../database/actions.js'
import * as events from '../database/events.js'
import blockDemoMode from '../middlewares/block-demo-mode.js'
import requireAuth from '../middlewares/require-auth.js'
import KnownError from '../utils/known-error.js'
import messages from '../utils/messages.js'
import pipe from '../utils/pipe.js'

export default {
  Event: {
    statistics: (parent) => parent,
  },
  Query: {
    event: pipe(requireAuth, (parent, { id }) => {
      return events.get(id)
    }),
    events: pipe(requireAuth, () => {
      return events.all()
    }),
  },
  Mutation: {
    createEvent: pipe(requireAuth, blockDemoMode, async (parent, { input }) => {
      let entry

      try {
        entry = await events.add(input)
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
    updateEvent: pipe(requireAuth, blockDemoMode, async (parent, { id, input }) => {
      let entry

      try {
        entry = await events.update(id, input)
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new KnownError(messages(error.errors))
        }

        throw error
      }

      if (entry == null) {
        throw new KnownError('Unknown event')
      }

      return {
        payload: entry,
        success: true,
      }
    }),
    deleteEvent: pipe(requireAuth, blockDemoMode, async (parent, { id }) => {
      await actions.del(id)
      await events.del(id)

      return {
        success: true,
      }
    }),
  },
}
