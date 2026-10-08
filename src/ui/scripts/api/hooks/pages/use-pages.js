import { gql } from '@apollo/client'

import enhancePages from '../../../enhancers/enhance-pages.js'
import pagesField from '../../fragments/pages-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchPages($id: ID!, $sorting: Sorting!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...pagesField
      }
    }
  }

  ${pagesField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.pages
  const enhancer = enhancePages

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
