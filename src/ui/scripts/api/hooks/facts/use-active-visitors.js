import { gql } from '@apollo/client'

import enhanceFacts from '../../../enhancers/enhance-facts.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchActiveVisitors($id: ID!) {
    domain(id: $id) {
      id
      facts {
        id
        activeVisitors
      }
    }
  }
`

export default (id) => {
  const selector = (data) => data?.domain.facts
  const enhancer = enhanceFacts

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      id,
    },
    pollInterval: 5000,
  })
}
