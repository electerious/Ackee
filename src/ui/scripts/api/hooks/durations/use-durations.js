import { gql } from '@apollo/client'

import enhanceDurations from '../../../enhancers/enhance-durations.js'
import durationsField from '../../fragments/durations-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchDurations($id: ID!, $interval: Interval!, $limit: Int) {
    domain(id: $id) {
      id
      statistics {
        id
        ...durationsField
      }
    }
  }

  ${durationsField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.durations
  const enhancer = (value) => enhanceDurations(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
