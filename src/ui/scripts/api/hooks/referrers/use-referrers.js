import { gql } from '@apollo/client'

import enhanceReferrers from '../../../enhancers/enhance-referrers.js'
import referrersField from '../../fragments/referrers-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchReferrers($id: ID!, $sorting: Sorting!, $type: ReferrerType!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...referrersField
      }
    }
  }

  ${referrersField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.referrers
  const enhancer = enhanceReferrers

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
