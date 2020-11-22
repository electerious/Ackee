import { createElement as h, Fragment } from 'react'

import systemsLoader from '../../loaders/systemsLoader'
import enhanceSystems from '../../enhancers/enhanceSystems'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetIds from '../../utils/useWidgetIds'

import CardSystems from '../cards/CardSystems'

const RouteSystems = (props) => {

	const widgetIds = useWidgetIds(props, systemsLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.systemsType
	})

	return (
		h(Fragment, {},

			widgetIds.map(
				(widgetId) => {
					const widget = props.widgets.value[widgetId]
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardSystems, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceSystems(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteSystems