import * as domains from '../database/domains.js'
import * as records from '../database/records.js'
import identifier from '../utils/identifier.js'
import KnownError from '../utils/known-error.js'
import messages from '../utils/messages.js'
import normalizeUrl from '../utils/normalize-url.js'

const normalizeSiteLocation = (siteLocation) => {
  if (siteLocation == null) {
    // Pre-validate siteLocation and imitate MongoDB error
    throw new KnownError(`Path \`siteLocation\` is required`)
  }

  try {
    return normalizeUrl(siteLocation.toString())
  } catch (error) {
    throw new KnownError(`Failed to normalize \`siteLocation\``, error)
  }
}

const normalizeSiteReferrer = (siteReferrer) => {
  // The siteReferrer is optional
  if (siteReferrer == null) return siteReferrer

  try {
    return normalizeUrl(siteReferrer.toString())
  } catch (error) {
    throw new KnownError(`Failed to normalize \`siteReferrer\``, error)
  }
}

const polish = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    value = typeof value === 'string' ? value.trim() : value
    if (value === null) value = undefined
    value = value === '' ? undefined : value

    if (key === 'siteLocation') value = normalizeSiteLocation(value)
    else if (key === 'siteReferrer') value = normalizeSiteReferrer(value)

    acc[key] = value
    return acc
  }, {})
}

export default {
  Mutation: {
    createRecord: async (parent, { domainId, input }, { ip, userAgent, isIgnored }) => {
      // Ignore your own records when logged in
      if (isIgnored === true) {
        return {
          success: true,
          payload: {
            // Sentinel UUID returned for ignored (own) visits so the tracker
            // receives a valid-looking response without persisting real data.
            // This value is stable and matched in tests.
            id: '88888888-8888-8888-8888-888888888888',
          },
        }
      }

      const clientId = identifier(ip, userAgent, domainId)
      const data = polish({ ...input, clientId, domainId })

      const domain = await domains.get(domainId)

      if (domain == null) throw new KnownError('Unknown domain')

      let entry

      try {
        entry = await records.add(data)
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new KnownError(messages(error.errors))
        }

        throw error
      }

      // Anonymize old entries with the same clientId to prevent that the browsing history
      // of a user is reconstructible. Will be skipped when there're no previous entries.
      await records.anonymize(clientId, entry.id)

      return {
        success: true,
        payload: entry,
      }
    },
    updateRecord: async (parent, { id }, { isIgnored }) => {
      // Ignore your own records when logged in
      if (isIgnored === true) {
        return {
          success: true,
        }
      }

      let entry

      try {
        entry = await records.update(id)
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new KnownError(messages(error.errors))
        }

        throw error
      }

      if (entry == null) {
        throw new KnownError('Unknown record')
      }

      return {
        success: true,
      }
    },
  },
}
