import { gql } from '@apollo/client'

import enhanceDevices from '../../../enhancers/enhance-devices.js'
import devicesField from '../../fragments/devices-field.js'
import useQuery from '../../utils/use-query.js'

const QUERY = gql`
  query fetchMergedDevices($sorting: Sorting!, $type: DeviceType!, $range: Range) {
    statistics {
      id
      ...devicesField
    }
  }

  ${devicesField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.devices
  const enhancer = enhanceDevices

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
