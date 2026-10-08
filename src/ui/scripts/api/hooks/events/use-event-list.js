import { gql } from '@apollo/client'

import enhanceEventList from '../../../enhancers/enhance-event-list.js'
import listField from '../../fragments/list-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchEventListEntries($id: ID!, $sorting: Sorting!, $type: EventListType!, $range: Range) {
    event(id: $id) {
      id
      statistics {
        id
        ...listField
      }
    }
  }

  ${listField}
`

export default (id, filters) => {
  const selector = (data) => data?.event.statistics.list
  const enhancer = enhanceEventList

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
