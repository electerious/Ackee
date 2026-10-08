import PropTypes from 'prop-types'
import { Fragment, createElement as h } from 'react'

import { MODALS_DURATIONS } from '../../constants/modals.js'

import useDomains from '../../api/hooks/domains/use-domains.js'
import useDurations from '../../api/hooks/durations/use-durations.js'
import useMergedDurations from '../../api/hooks/durations/use-merged-durations.js'

import CardStatistics from '../cards/card-statistics.js'
import RendererDurations from '../renderers/renderer-durations.js'

const RouteDurations = (props) => {
  const domains = useDomains()

  return h(
    Fragment,
    {},
    h(CardStatistics, {
      wide: true,
      headline: 'Durations',
      hook: useMergedDurations,
      hookArgs: [
        {
          interval: props.filters.interval,
          limit: 14,
        },
      ],
      renderer: RendererDurations,
      rendererProps: {
        interval: props.filters.interval,
        onItemClick: (index) =>
          props.addModal(MODALS_DURATIONS, {
            index,
            interval: props.filters.interval,
            limit: 14,
          }),
      },
    }),
    domains.value.map((domain) => {
      return h(CardStatistics, {
        key: domain.id,
        headline: domain.title,
        onMore: () => props.setRoute(`/domains/${domain.id}`),
        hook: useDurations,
        hookArgs: [
          domain.id,
          {
            interval: props.filters.interval,
            limit: 7,
          },
        ],
        renderer: RendererDurations,
        rendererProps: {
          interval: props.filters.interval,
        },
      })
    }),
  )
}

RouteDurations.propTypes = {
  setRoute: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default RouteDurations
