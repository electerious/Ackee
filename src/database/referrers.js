import {
  REFERRERS_TYPE_NO_SOURCE,
  REFERRERS_TYPE_ONLY_SOURCE,
  REFERRERS_TYPE_WITH_SOURCE,
} from '../constants/referrers.js'
import dimension from './dimension.js'

// A source set by the site wins over the referrer the browser sent.
const format = (id) => id.source || id.siteReferrer

export default dimension({
  [REFERRERS_TYPE_WITH_SOURCE]: {
    fields: ['source', 'siteReferrer'],
    format,
    or: true,
  },
  [REFERRERS_TYPE_NO_SOURCE]: {
    fields: ['siteReferrer'],
    format,
  },
  [REFERRERS_TYPE_ONLY_SOURCE]: {
    fields: ['source'],
    format,
  },
})
