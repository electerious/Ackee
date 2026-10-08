import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import * as events from '../../../../constants/events.js'

import useEventChartEntries from '../../api/hooks/events/use-event-chart.js'
import useEventListEntries from '../../api/hooks/events/use-event-list.js'
import useEvents from '../../api/hooks/events/use-events.js'

import CardStatistics from '../cards/card-statistics.js'
import RendererEventChart from '../renderers/renderer-event-chart.js'
import RendererList from '../renderers/renderer-list.js'

const cardProps = (event, props) => {
  switch (event.type) {
    case events.EVENTS_TYPE_TOTAL_CHART:
    case events.EVENTS_TYPE_AVERAGE_CHART: {
      return {
        hook: useEventChartEntries,
        hookArgs: [
          event.id,
          {
            interval: props.filters.interval,
            type: event.type === events.EVENTS_TYPE_AVERAGE_CHART ? 'AVERAGE' : 'TOTAL',
            limit: 7,
          },
        ],
        renderer: RendererEventChart,
        rendererProps: {
          interval: props.filters.interval,
        },
      }
    }
    case events.EVENTS_TYPE_TOTAL_LIST:
    case events.EVENTS_TYPE_AVERAGE_LIST: {
      return {
        hook: useEventListEntries,
        hookArgs: [
          event.id,
          {
            sorting: props.filters.sorting,
            type: event.type === events.EVENTS_TYPE_AVERAGE_LIST ? 'AVERAGE' : 'TOTAL',
            range: props.filters.range,
          },
        ],
        renderer: RendererList,
        rendererProps: {
          sorting: props.filters.sorting,
          range: props.filters.range,
        },
      }
    }
    default: {
      throw new Error(`Unknown event type '${event.type}'`)
    }
  }
}

const RouteEvents = (props) => {
  const events = useEvents()

  return events.value.map((event) => {
    return h(CardStatistics, {
      key: event.id,
      headline: event.title,
      ...cardProps(event, props),
    })
  })
}

RouteEvents.propTypes = {
  filters: PropTypes.object.isRequired,
}

export default RouteEvents
