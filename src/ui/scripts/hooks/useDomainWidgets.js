import { createElement as h, useEffect, useState } from 'react'

import CardWidget from '../components/cards/CardWidget'

import { initialSubState } from '../reducers/widgets'
import * as selectDomainsValue from '../selectors/selectDomainsValue'
import overviewRoute from '../utils/overviewRoute'

export default (props, createLoader, opts, additionalProps = {}) => {

	const [ widgetIds, setWidgetIds ] = useState([])

	useEffect(() => {

		const loaders = props.domains.value.map((domain) =>
			createLoader(domain.id, opts)
		)

		const widgetIds = loaders.map((loader) =>
			loader.id
		)

		if (loaders.length > 0) {
			props.fetchWidgets(props, loaders)
			setWidgetIds(widgetIds)
		}

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