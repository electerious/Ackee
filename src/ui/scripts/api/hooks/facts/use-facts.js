import { gql } from '@apollo/client'

import enhanceFacts from '../../../enhancers/enhance-facts.js'
import factsFields from '../../fragments/facts-fields.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchFacts($id: ID!) {
    domain(id: $id) {
      id
      facts {
        ...factsFields
      }
    }
  }

  ${factsFields}
`

export default (id) => {
  const selector = (data) => data?.domain.facts
  const enhancer = enhanceFacts

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      id,
    },
  })
}
