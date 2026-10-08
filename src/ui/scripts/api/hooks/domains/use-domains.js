import { gql } from '@apollo/client'

import domainFields from '../../fragments/domain-fields.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchDomains {
    domains {
      ...domainFields
    }
  }

  ${domainFields}
`

export default () => {
  const selector = (data) => data?.domains
  const enhancer = (domains = []) => domains

  return useQuery(QUERY, selector, enhancer, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  })
}
