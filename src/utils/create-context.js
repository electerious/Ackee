import { getClientIp } from 'request-ip'

import config from './config.js'
import createDate from './create-date.js'
import { isSet } from './ignore-cookie.js'
import isAuthenticated from './is-authenticated.js'

export const createServerlessContext = (request) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',', 1)[0]?.trim() || request.headers.get('x-real-ip')
  const headers = Object.fromEntries(request.headers)
  return createContext(ip, headers)
}

export const createExpressContext = ({ req }) => {
  return createContext(getClientIp(req), req.headers)
}

const createContext = async (ip, headers) => {
  return {
    isDemoMode: config.isDemoMode,
    isAuthenticated: await isAuthenticated(headers['authorization'], config.ttl),
    isIgnored: isSet(headers['cookie']),
    dateDetails: createDate(headers['time-zone']),
    userAgent: headers['user-agent'],
    ip,
    // Variables used by to set and read cookies and headers
    setCookies: [],
    setHeaders: [],
  }
}
