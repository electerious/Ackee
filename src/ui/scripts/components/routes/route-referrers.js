import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import useDomains from '../../api/hooks/domains/use-domains.js'
import useReferrers from '../../api/hooks/referrers/use-referrers.js'

import CardStatistics from '../cards/card-statistics.js'
import RendererReferrers from '../renderers/renderer-referrers.js'

const RouteReferrers = (props) => {
  const domains = useDomains()

  return domains.value.map((domain) => {
    return h(CardStatistics, {
      key: domain.id,
      headline: domain.title,
      onMore: () => props.setRoute(`/domains/${domain.id}`),
      hook: useReferrers,
      hookArgs: [
        domain.id,
        {
          sorting: props.filters.sorting,
          type: props.filters.referrersType,
          range: props.filters.range,
        },
      ],
      renderer: RendererReferrers,
      rendererProps: {
        sorting: props.filters.sorting,
        range: props.filters.range,
      },
    })
  })
}

RouteReferrers.propTypes = {
  setRoute: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default RouteReferrers
