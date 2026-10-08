import fullyQualifiedDomainNames from './fully-qualified-domain-names.js'

export default async (requestOrigin, allowedOrigins, autoOrigin) => {
  if (autoOrigin === true) {
    const names = await fullyQualifiedDomainNames()
    const origins = names.flatMap((name) => [`http://${name}`, `https://${name}`])
    return origins.includes(requestOrigin) ? requestOrigin : null
  }

  if (allowedOrigins === '*') return '*'

  if (allowedOrigins != null) {
    const origins = allowedOrigins.split(',')
    return origins.includes(requestOrigin) ? requestOrigin : null
  }

  return null
}
