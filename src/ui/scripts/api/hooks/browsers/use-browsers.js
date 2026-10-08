import { gql } from '@apollo/client'

import enhanceBrowsers from '../../../enhancers/enhance-browsers.js'
import browsersField from '../../fragments/browsers-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchBrowsers($id: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...browsersField
      }
    }
  }

  ${browsersField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.browsers
  const enhancer = enhanceBrowsers

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
