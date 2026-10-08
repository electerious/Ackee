import { gql } from '@apollo/client'

import permanentTokenFields from '../../fragments/permanent-token-fields.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query permanentTokens {
    permanentTokens {
      ...permanentTokenFields
    }
  }

  ${permanentTokenFields}
`

export default () => {
  const selector = (data) => data?.permanentTokens
  const enhancer = (permanentTokens = []) => permanentTokens

  return useQuery(QUERY, selector, enhancer, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  })
}
