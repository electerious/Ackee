import { gql } from '@apollo/client'

import enhanceFacts from '../../../enhancers/enhance-facts.js'
import factsFields from '../../fragments/facts-fields.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedFacts {
    facts {
      ...factsFields
    }
  }

  ${factsFields}
`

export default () => {
  const selector = (data) => data?.facts
  const enhancer = enhanceFacts

  return useQuery(QUERY, selector, enhancer)
}
