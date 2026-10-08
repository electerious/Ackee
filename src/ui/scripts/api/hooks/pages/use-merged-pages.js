import { gql } from '@apollo/client'

import enhancePages from '../../../enhancers/enhance-pages.js'
import pagesField from '../../fragments/pages-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedPages($sorting: Sorting!, $range: Range) {
    statistics {
      id
      ...pagesField
    }
  }

  ${pagesField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.pages
  const enhancer = enhancePages

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
