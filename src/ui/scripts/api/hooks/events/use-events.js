import { gql } from '@apollo/client'

import eventFields from '../../fragments/event-fields.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchEvents {
    events {
      ...eventFields
    }
  }

  ${eventFields}
`

export default () => {
  const selector = (data) => data?.events
  const enhancer = (events = []) => events

  return useQuery(QUERY, selector, enhancer, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  })
}
