import { gql } from '@apollo/client'

import enhanceFacts from '../../../enhancers/enhance-facts.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedActiveVisitors {
    facts {
      id
      activeVisitors
    }
  }
`

export default () => {
  const selector = (data) => data?.facts
  const enhancer = enhanceFacts

  return useQuery(QUERY, selector, enhancer, {
    pollInterval: 5000,
  })
}
