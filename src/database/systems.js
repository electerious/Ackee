import { SYSTEMS_TYPE_NO_VERSION, SYSTEMS_TYPE_WITH_VERSION } from '../constants/systems.js'
import dimension from './dimension.js'

export default dimension({
  [SYSTEMS_TYPE_NO_VERSION]: {
    fields: ['osName'],
    format: (id) => `${id.osName}`,
  },
  [SYSTEMS_TYPE_WITH_VERSION]: {
    fields: ['osName', 'osVersion'],
    format: (id) => `${id.osName} ${id.osVersion}`,
  },
})
