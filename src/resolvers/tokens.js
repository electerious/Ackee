import * as tokens from '../database/tokens.js'
import config from '../utils/config.js'
import { off as ignoreCookieOff, on as ignoreCookieOn } from '../utils/ignore-cookie.js'
import KnownError from '../utils/known-error.js'

const response = (entry) => ({
  id: entry.id,
  created: entry.created,
  updated: entry.updated,
})

export default {
  Mutation: {
    createToken: async (parent, { input }, { setCookies }) => {
      const { username, password } = input

      if (config.username == null) throw new KnownError('Ackee username missing in environment')
      if (config.password == null) throw new KnownError('Ackee password missing in environment')

      if (username !== config.username) throw new KnownError('Username or password incorrect')
      if (password !== config.password) throw new KnownError('Username or password incorrect')

      const entry = await tokens.add()

      // Set cookie to avoid reporting your own visits
      setCookies.push(ignoreCookieOn)

      return {
        success: true,
        payload: response(entry),
      }
    },
    deleteToken: async (parent, { id }, { setCookies }) => {
      await tokens.del(id)

      // Remove cookie to report your own visits, again
      setCookies.push(ignoreCookieOff)

      return {
        success: true,
      }
    },
  },
}
