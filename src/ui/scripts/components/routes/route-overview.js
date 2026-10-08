import PropTypes from 'prop-types'
import { Fragment, createElement as h } from 'react'

import { BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers.js'
import { DEVICES_TYPE_WITH_MODEL } from '../../../../constants/devices.js'
import { INTERVALS_DAILY } from '../../../../constants/intervals.js'
import { RANGES_LAST_24_HOURS } from '../../../../constants/ranges.js'
import { REFERRERS_TYPE_WITH_SOURCE } from '../../../../constants/referrers.js'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../../constants/sizes.js'
import { SORTINGS_TOP } from '../../../../constants/sortings.js'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems.js'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views.js'

import { MODALS_DURATIONS, MODALS_VIEWS } from '../../constants/modals.js'

import useMergedBrowsers from '../../api/hooks/browsers/use-merged-browsers.js'
import useMergedDevices from '../../api/hooks/devices/use-merged-devices.js'
import useMergedDurations from '../../api/hooks/durations/use-merged-durations.js'
import useMergedActiveVisitors from '../../api/hooks/facts/use-merged-active-visitors.js'
import useMergedFacts from '../../api/hooks/facts/use-merged-facts.js'
import useMergedLanguages from '../../api/hooks/languages/use-merged-languages.js'
import useMergedPages from '../../api/hooks/pages/use-merged-pages.js'
import useMergedReferrers from '../../api/hooks/referrers/use-merged-referrers.js'
import useMergedSizes from '../../api/hooks/sizes/use-merged-sizes.js'
import useMergedSystems from '../../api/hooks/systems/use-merged-systems.js'
import useMergedViews from '../../api/hooks/views/use-merged-views.js'

import CardFacts from '../cards/card-facts.js'
import CardStatistics from '../cards/card-statistics.js'

import RendererDurations from '../renderers/renderer-durations.js'
import RendererList from '../renderers/renderer-list.js'
import RendererReferrers from '../renderers/renderer-referrers.js'
import RendererViews from '../renderers/renderer-views.js'

const RouteOverview = (props) => {
  useMergedActiveVisitors()

  return h(
    Fragment,
    {},
    h(CardFacts, {
      hook: useMergedFacts,
      hookArgs: [],
    }),
    h('div', { className: 'content__spacer' }),
    h(CardStatistics, {
      wide: true,
      headline: 'Views',
      onMore: () => props.setRoute('/insights/views'),
      hook: useMergedViews,
      hookArgs: [
        {
          interval: INTERVALS_DAILY,
          type: VIEWS_TYPE_UNIQUE,
          limit: 14,
        },
      ],
      renderer: RendererViews,
      rendererProps: {
        interval: INTERVALS_DAILY,
        onItemClick: (index) =>
          props.addModal(MODALS_VIEWS, {
            index,
            interval: INTERVALS_DAILY,
            type: VIEWS_TYPE_UNIQUE,
            limit: 14,
          }),
      },
    }),
    h(CardStatistics, {
      wide: true,
      headline: 'Durations',
      onMore: () => props.setRoute('/insights/durations'),
      hook: useMergedDurations,
      hookArgs: [
        {
          interval: INTERVALS_DAILY,
          limit: 14,
        },
      ],
      renderer: RendererDurations,
      rendererProps: {
        interval: INTERVALS_DAILY,
        onItemClick: (index) =>
          props.addModal(MODALS_DURATIONS, {
            index,
            interval: INTERVALS_DAILY,
            limit: 14,
          }),
      },
    }),
    h(CardStatistics, {
      headline: 'Pages',
      onMore: () => props.setRoute('/insights/pages'),
      hook: useMergedPages,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
    h(CardStatistics, {
      headline: 'Referrers',
      onMore: () => props.setRoute('/insights/referrers'),
      hook: useMergedReferrers,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          type: REFERRERS_TYPE_WITH_SOURCE,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererReferrers,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
    h('div', { className: 'content__spacer' }),
    h(CardStatistics, {
      headline: 'Systems',
      onMore: () => props.setRoute('/insights/systems'),
      hook: useMergedSystems,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          type: SYSTEMS_TYPE_WITH_VERSION,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
    h(CardStatistics, {
      headline: 'Devices',
      onMore: () => props.setRoute('/insights/devices'),
      hook: useMergedDevices,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          type: DEVICES_TYPE_WITH_MODEL,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
    h(CardStatistics, {
      headline: 'Browsers',
      onMore: () => props.setRoute('/insights/browsers'),
      hook: useMergedBrowsers,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          type: BROWSERS_TYPE_WITH_VERSION,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
    h(CardStatistics, {
      headline: 'Sizes',
      onMore: () => props.setRoute('/insights/sizes'),
      hook: useMergedSizes,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          type: SIZES_TYPE_BROWSER_RESOLUTION,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
    h(CardStatistics, {
      headline: 'Languages',
      onMore: () => props.setRoute('/insights/languages'),
      hook: useMergedLanguages,
      hookArgs: [
        {
          sorting: SORTINGS_TOP,
          range: RANGES_LAST_24_HOURS,
        },
      ],
      renderer: RendererList,
      rendererProps: {
        sorting: SORTINGS_TOP,
        range: RANGES_LAST_24_HOURS,
      },
    }),
  )
}

RouteOverview.propTypes = {
  setRoute: PropTypes.func.isRequired,
}

export default RouteOverview
