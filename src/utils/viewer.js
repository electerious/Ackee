import * as permanentTokens from '../database/permanentTokens.js'
import * as tokens from '../database/tokens.js'
import isExpired from './isExpired.js'
import KnownError from './KnownError.js'

// There are no accounts yet, so every valid token belongs to the one admin from the env.
const admin = Object.freeze({ isAdmin: true })

// Returns who sent the request, or the KnownError that `requireAuth` throws.
export default async (authorization, ttl) => {
  if (authorization == null) return new KnownError('Token missing')

  const [key, token] = authorization.split(' ')

  if (key !== 'Bearer' || token == null) return new KnownError('Token missing')

  const tokenEntry = await tokens.get(token)

  if (tokenEntry != null) {
    // Session tokens expire when unused.
    if (isExpired(tokenEntry.updated, ttl) === true) return new KnownError('Token invalid')

    await tokens.update(token)

    return admin
  }

  const permanentTokenEntry = await permanentTokens.get(token)

  if (permanentTokenEntry != null) {
    // Records the last time the token was used.
    await permanentTokens.update(token, { title: permanentTokenEntry.title })

    return admin
  }

  return new KnownError('Token invalid')
}
