import { gql } from '@apollo/client'

import enhanceLanguages from '../../../enhancers/enhance-languages.js'
import languagesField from '../../fragments/languages-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedLanguages($sorting: Sorting!, $range: Range) {
    statistics {
      id
      ...languagesField
    }
  }

  ${languagesField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.languages
  const enhancer = enhanceLanguages

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
