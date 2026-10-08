import { gql } from '@apollo/client'

import enhanceSizes from '../../../enhancers/enhance-sizes.js'
import sizesField from '../../fragments/sizes-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
    statistics {
      id
      ...sizesField
    }
  }

  ${sizesField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.sizes
  const enhancer = enhanceSizes

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
