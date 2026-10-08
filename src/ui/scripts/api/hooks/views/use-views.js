import { gql } from '@apollo/client'

import enhanceViews from '../../../enhancers/enhance-views.js'
import viewsField from '../../fragments/views-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchViews($id: ID!, $interval: Interval!, $type: ViewType!, $limit: Int) {
    domain(id: $id) {
      id
      statistics {
        id
        ...viewsField
      }
    }
  }

  ${viewsField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.views
  const enhancer = (value) => enhanceViews(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
