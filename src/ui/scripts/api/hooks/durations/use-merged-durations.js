import { gql } from '@apollo/client'

import enhanceDurations from '../../../enhancers/enhance-durations.js'
import durationsField from '../../fragments/durations-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedDurations($interval: Interval!, $limit: Int) {
    statistics {
      id
      ...durationsField
    }
  }

  ${durationsField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.durations
  const enhancer = (value) => enhanceDurations(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
