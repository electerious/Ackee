import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import useDevices from '../../api/hooks/devices/use-devices.js'
import useDomains from '../../api/hooks/domains/use-domains.js'

import CardStatistics from '../cards/card-statistics.js'
import RendererList from '../renderers/renderer-list.js'

const RouteDevices = (props) => {
  const domains = useDomains()

  return domains.value.map((domain) => {
    return h(CardStatistics, {
      key: domain.id,
      headline: domain.title,
      onMore: () => props.setRoute(`/domains/${domain.id}`),
      hook: useDevices,
      hookArgs: [
        domain.id,
        {
          sorting: props.filters.sorting,
          type: props.filters.devicesType,
          range: props.filters.range,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: props.filters.sorting,
        range: props.filters.range,
      },
    })
  })
}

RouteDevices.propTypes = {
  setRoute: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default RouteDevices
