import isValidDomain from 'is-valid-domain'

import * as domains from '../database/domains.js'

export default async () => {
  const allDomains = await domains.all()
  const allTitles = allDomains.map((domain) => domain.title)
  const fullyQualifiedDomainNames = allTitles.filter((title) =>
    isValidDomain(title, { subdomain: true, wildcard: false, allowUnicode: true }),
  )

  return fullyQualifiedDomainNames
}
