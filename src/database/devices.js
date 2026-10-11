import { DEVICES_TYPE_NO_MODEL, DEVICES_TYPE_WITH_MODEL } from '../constants/devices.js'
import dimension from './dimension.js'

export default dimension({
  [DEVICES_TYPE_NO_MODEL]: {
    fields: ['deviceManufacturer'],
    format: (id) => `${id.deviceManufacturer}`,
  },
  [DEVICES_TYPE_WITH_MODEL]: {
    fields: ['deviceManufacturer', 'deviceName'],
    format: (id) => `${id.deviceManufacturer} ${id.deviceName}`,
  },
})
