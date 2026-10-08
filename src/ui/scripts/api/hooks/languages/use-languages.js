import { gql } from '@apollo/client'

import enhanceLanguages from '../../../enhancers/enhance-languages.js'
import languagesField from '../../fragments/languages-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchLanguages($id: ID!, $sorting: Sorting!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...languagesField
      }
    }
  }

  ${languagesField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.languages
  const enhancer = enhanceLanguages

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
