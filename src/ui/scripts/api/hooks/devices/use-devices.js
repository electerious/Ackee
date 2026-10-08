import { gql } from '@apollo/client'

import enhanceDevices from '../../../enhancers/enhance-devices.js'
import devicesField from '../../fragments/devices-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchDevices($id: ID!, $sorting: Sorting!, $type: DeviceType!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...devicesField
      }
    }
  }

  ${devicesField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.devices
  const enhancer = enhanceDevices

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
