import { mergeResolvers } from '@graphql-tools/merge'

import actions from './actions.js'
import domainStatistics from './domain-statistics.js'
import domains from './domains.js'
import eventStatistics from './event-statistics.js'
import events from './events.js'
import facts from './facts.js'
import permanentTokens from './permanent-tokens.js'
import records from './records.js'
import tokens from './tokens.js'

export default mergeResolvers([
  tokens,
  permanentTokens,
  records,
  domains,
  events,
  actions,
  facts,
  domainStatistics,
  eventStatistics,
])
