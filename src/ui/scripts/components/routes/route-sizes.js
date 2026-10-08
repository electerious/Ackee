import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import useDomains from '../../api/hooks/domains/use-domains.js'
import useSizes from '../../api/hooks/sizes/use-sizes.js'

import CardStatistics from '../cards/card-statistics.js'
import RendererList from '../renderers/renderer-list.js'

const RouteSizes = (props) => {
  const domains = useDomains()

  return domains.value.map((domain) => {
    return h(CardStatistics, {
      key: domain.id,
      headline: domain.title,
      onMore: () => props.setRoute(`/domains/${domain.id}`),
      hook: useSizes,
      hookArgs: [
        domain.id,
        {
          sorting: props.filters.sorting,
          type: props.filters.sizesType,
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

RouteSizes.propTypes = {
  setRoute: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default RouteSizes
