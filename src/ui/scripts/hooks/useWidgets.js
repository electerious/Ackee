import { createElement as h, useState, useEffect } from 'react'

import { initialSubState } from '../reducers/widgets'

import CardWidget from '../components/cards/CardWidget'

export default (props, widgetConfigs = []) => {

	const [ widgetIds, setWidgetIds ] = useState([])

	useEffect(() => {

		const loaders = widgetConfigs.map((widgetConfig) =>
			widgetConfig.loader
		)

		const widgetIds = loaders.map((loader) =>
			loader.id
		)

		props.fetchWidgets(props, loaders)
		setWidgetIds(widgetIds)

	}, [ widgetConfigs ])

	return widgetIds.map(
		(widgetId, index) => {
			const widgetData = props.widgets.value[widgetId] || initialSubState()

			return h(CardWidget, {
				key: widgetId,
				widget: widgetData,
				...widgetConfigs[index].additionalProps
			})
		}
	)

}