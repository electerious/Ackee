import { gql } from '@apollo/client'

import enhanceSizes from '../../../enhancers/enhance-sizes.js'
import sizesField from '../../fragments/sizes-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchSizes($id: ID!, $sorting: Sorting!, $type: SizeType!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...sizesField
      }
    }
  }

  ${sizesField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.sizes
  const enhancer = enhanceSizes

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
