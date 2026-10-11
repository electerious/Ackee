import { BROWSERS_TYPE_NO_VERSION, BROWSERS_TYPE_WITH_VERSION } from '../constants/browsers.js'
import dimension from './dimension.js'

export default dimension({
  [BROWSERS_TYPE_NO_VERSION]: {
    fields: ['browserName'],
    format: (id) => `${id.browserName}`,
  },
  [BROWSERS_TYPE_WITH_VERSION]: {
    fields: ['browserName', 'browserVersion'],
    format: (id) => `${id.browserName} ${id.browserVersion}`,
  },
})
