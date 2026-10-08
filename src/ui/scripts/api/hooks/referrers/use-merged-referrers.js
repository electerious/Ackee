import { gql } from '@apollo/client'

import enhanceReferrers from '../../../enhancers/enhance-referrers.js'
import referrersField from '../../fragments/referrers-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedReferrers($sorting: Sorting!, $type: ReferrerType!, $range: Range) {
    statistics {
      id
      ...referrersField
    }
  }

  ${referrersField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.referrers
  const enhancer = enhanceReferrers

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
