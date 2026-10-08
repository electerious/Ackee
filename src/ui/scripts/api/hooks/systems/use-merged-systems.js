import { gql } from '@apollo/client'

import enhanceSystems from '../../../enhancers/enhance-systems.js'
import systemsField from '../../fragments/systems-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
    statistics {
      id
      ...systemsField
    }
  }

  ${systemsField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.systems
  const enhancer = enhanceSystems

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
