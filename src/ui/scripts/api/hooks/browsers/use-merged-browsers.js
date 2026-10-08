import { gql } from '@apollo/client'

import enhanceBrowsers from '../../../enhancers/enhance-browsers.js'
import browsersField from '../../fragments/browsers-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedBrowsers($sorting: Sorting!, $type: BrowserType!, $range: Range) {
    statistics {
      id
      ...browsersField
    }
  }

  ${browsersField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.browsers
  const enhancer = enhanceBrowsers

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
