import { gql } from '@apollo/client'

import enhanceViews from '../../../enhancers/enhance-views.js'
import viewsField from '../../fragments/views-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedViews($interval: Interval!, $type: ViewType!, $limit: Int) {
    statistics {
      id
      ...viewsField
    }
  }

  ${viewsField}
`

export default (filters, options) => {
  const selector = (data) => data?.statistics.views
  const enhancer = (value) => enhanceViews(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
    ...options,
  })
}
