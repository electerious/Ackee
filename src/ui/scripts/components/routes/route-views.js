import PropTypes from 'prop-types'
import { Fragment, createElement as h } from 'react'

import { VIEWS_TYPE_TOTAL, VIEWS_TYPE_UNIQUE } from '../../../../constants/views.js'

import { MODALS_VIEWS } from '../../constants/modals.js'

import useDomains from '../../api/hooks/domains/use-domains.js'
import useMergedViews from '../../api/hooks/views/use-merged-views.js'
import useViews from '../../api/hooks/views/use-views.js'

import CardStatistics from '../cards/card-statistics.js'
import RendererViews from '../renderers/renderer-views.js'

const RouteViews = (props) => {
  const domains = useDomains()

  return h(
    Fragment,
    {},
    h(CardStatistics, {
      wide: true,
      headline: {
        [VIEWS_TYPE_UNIQUE]: 'Site Views',
        [VIEWS_TYPE_TOTAL]: 'Page Views',
      }[props.filters.viewsType],
      hook: useMergedViews,
      hookArgs: [
        {
          interval: props.filters.interval,
          type: props.filters.viewsType,
          limit: 14,
        },
      ],
      renderer: RendererViews,
      rendererProps: {
        interval: props.filters.interval,
        onItemClick: (index) =>
          props.addModal(MODALS_VIEWS, {
            index,
            interval: props.filters.interval,
            type: props.filters.viewsType,
            limit: 14,
          }),
      },
    }),
    domains.value.map((domain) => {
      return h(CardStatistics, {
        key: domain.id,
        headline: domain.title,
        onMore: () => props.setRoute(`/domains/${domain.id}`),
        hook: useViews,
        hookArgs: [
          domain.id,
          {
            interval: props.filters.interval,
            type: props.filters.viewsType,
            limit: 7,
          },
        ],
        renderer: RendererViews,
        rendererProps: {
          interval: props.filters.interval,
        },
      })
    }),
  )
}

RouteViews.propTypes = {
  setRoute: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default RouteViews
