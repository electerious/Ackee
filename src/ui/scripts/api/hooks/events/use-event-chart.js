import { gql } from '@apollo/client'

import enhanceEventChart from '../../../enhancers/enhance-event-chart.js'
import chartField from '../../fragments/chart-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchEventChartEntries($id: ID!, $interval: Interval!, $type: EventChartType!, $limit: Int) {
    event(id: $id) {
      id
      statistics {
        id
        ...chartField
      }
    }
  }

  ${chartField}
`

export default (id, filters) => {
  const selector = (data) => data?.event.statistics.chart
  const enhancer = (value) => enhanceEventChart(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
