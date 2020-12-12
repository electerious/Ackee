import { createElement as h, useState, useEffect } from 'react'

import { initialSubState } from '../reducers/widgets'

import CardWidget from '../components/cards/CardWidget'

const defaultWidgetConfig = {
	WidgetComponent: CardWidget,
	additionalProps: {}
}

export default (props, widgetConfigs = []) => {

	const [ widgetIds, setWidgetIds ] = useState([])

	useEffect(() => {

		const loaders = widgetConfigs.map((widgetConfig) =>
			widgetConfig.loader
		)

		const widgetIds = loaders.map((loader) =>
			loader.id
		)

		// Only fetch widgets when there's something to load.
		// Empty requests are forbidden.
		if (loaders.length > 0) {
			props.fetchWidgets(props, loaders)
			setWidgetIds(widgetIds)
		}

	}, [ widgetConfigs ])

	return widgetIds.map(
		(widgetId, index) => {
			const widgetData = props.widgets.value[widgetId] || initialSubState()

			const widgetConfig = {
				...defaultWidgetConfig,
				...widgetConfigs[index]
			}

			return h(widgetConfig.WidgetComponent, {
				key: widgetId,
				widget: widgetData,
				...widgetConfig.additionalProps
			})
		}
	)

}