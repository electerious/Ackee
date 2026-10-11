import {
  SIZES_TYPE_BROWSER_HEIGHT,
  SIZES_TYPE_BROWSER_RESOLUTION,
  SIZES_TYPE_BROWSER_WIDTH,
  SIZES_TYPE_SCREEN_HEIGHT,
  SIZES_TYPE_SCREEN_RESOLUTION,
  SIZES_TYPE_SCREEN_WIDTH,
} from '../constants/sizes.js'
import dimension from './dimension.js'

export default dimension({
  [SIZES_TYPE_BROWSER_WIDTH]: {
    fields: ['browserWidth'],
    format: (id) => `${id.browserWidth}px`,
  },
  [SIZES_TYPE_BROWSER_HEIGHT]: {
    fields: ['browserHeight'],
    format: (id) => `${id.browserHeight}px`,
  },
  [SIZES_TYPE_BROWSER_RESOLUTION]: {
    fields: ['browserWidth', 'browserHeight'],
    format: (id) => `${id.browserWidth}px x ${id.browserHeight}px`,
  },
  [SIZES_TYPE_SCREEN_WIDTH]: {
    fields: ['screenWidth'],
    format: (id) => `${id.screenWidth}px`,
  },
  [SIZES_TYPE_SCREEN_HEIGHT]: {
    fields: ['screenHeight'],
    format: (id) => `${id.screenHeight}px`,
  },
  [SIZES_TYPE_SCREEN_RESOLUTION]: {
    fields: ['screenWidth', 'screenHeight'],
    format: (id) => `${id.screenWidth}px x ${id.screenHeight}px`,
  },
})
