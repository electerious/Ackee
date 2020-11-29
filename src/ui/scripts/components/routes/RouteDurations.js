import { createElement as h, Fragment } from 'react'

import durationsLoader from '../../loaders/durationsLoader'
import enhanceDurations from '../../enhancers/enhanceDurations'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import mergeDurations from '../../utils/mergeDurations'
import overviewRoute from '../../utils/overviewRoute'
import useWidgets from '../../utils/useWidgets'

import CardDurations from '../cards/CardDurations'

const RouteDurations = (props) => {

	const widgets = useWidgets(props, durationsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			h(CardDurations, {
				wide: true,
				headline: 'Durations',
				interval: props.filter.interval,
				loading: props.fetching,
				items: mergeDurations(widgets)
			}),

			widgets.map(
				(widget) => {
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardDurations, {
						key: domain.id,
						headline: domain.title,
						interval: widget.variables.interval,
						loading: widget.fetching,
						items: enhanceDurations(widget.value, 7),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)
		)
	)

}

export default RouteDurations