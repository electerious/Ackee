import * as actions from '../database/actions.js'
import * as events from '../database/events.js'
import KnownError from '../utils/KnownError.js'
import validated from '../utils/validated.js'

const polish = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    value = typeof value === 'string' ? value.trim() : value
    value = value == null ? undefined : value
    value = value === '' ? undefined : value

    acc[key] = value
    return acc
  }, {})
}

export default {
  Mutation: {
    createAction: async (parent, { eventId, input }, { isIgnored }) => {
      // Ignore your own actions when logged in
      if (isIgnored === true) {
        return {
          success: true,
          payload: {
            id: '88888888-8888-8888-8888-888888888888',
          },
        }
      }

      const data = polish({ ...input, eventId })

      const event = await events.get(eventId)

      if (event == null) throw new KnownError('Unknown event')

      const entry = await validated(actions.add(data))

      return {
        success: true,
        payload: entry,
      }
    },
    updateAction: async (parent, { id, input }, { isIgnored }) => {
      // Ignore your own actions when logged in
      if (isIgnored === true) {
        return {
          success: true,
        }
      }

      const entry = await validated(actions.update(id, input))

      if (entry == null) {
        throw new KnownError('Unknown action')
      }

      return {
        success: true,
      }
    },
  },
}
