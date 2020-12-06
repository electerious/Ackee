import { createElement as h, useEffect, useState } from 'react'

import CardWidget from '../components/cards/CardWidget'

import { initialSubState } from '../reducers/widgets'
import * as selectDomainsValue from '../selectors/selectDomainsValue'
import overviewRoute from './overviewRoute'

export default (props, createLoader, opts, additionalProps = {}) => {

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

	return widgetIds.map(
		(widgetId) => {
			const widgetData = props.widgets.value[widgetId] || initialSubState()
			const domain = selectDomainsValue.byId(props, widgetData.variables.domainId)

			return h(CardWidget, {
				key: domain.id,
				headline: domain.title,
				widget: widgetData,
				onMore: () => props.setRoute(overviewRoute(domain)),
				...additionalProps
			})
		}
	)

}