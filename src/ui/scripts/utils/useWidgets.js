import { createElement as h, useEffect, useState } from 'react'

import CardWidget from '../components/cards/CardWidget'

import { initialSubState } from '../reducers/widgets'
import * as selectDomainsValue from '../selectors/selectDomainsValue'
import overviewRoute from './overviewRoute'

export default (props, createLoader, opts) => {

	const [ widgetIds, setWidgetIds ] = useState([])

	useEffect(() => {

		const widgetIds = props.domains.value.map(
			(domain) => {
				const loader = createLoader(domain.id, opts)
				props.fetchWidget(props, loader)

				return loader.id
			}
		)

		setWidgetIds(widgetIds)

	}, [ props.domains.value, ...Object.values(opts) ])

	const rawWidgets = widgetIds.map((widgetId) => {
		const widget = props.widgets.value[widgetId]
		return widget == null ? initialSubState() : widget
	})

	const renderedWidgets = rawWidgets.map(
		(widgetData) => {
			const domain = selectDomainsValue.byId(props, widgetData.variables.domainId)

			return h(CardWidget, {
				key: domain.id,
				headline: domain.title,
				widget: widgetData,
				onMore: () => props.setRoute(overviewRoute(domain))
			})
		}
	)

	return {
		rawWidgets,
		renderedWidgets
	}

}