import { createElement as h, useMemo, useEffect } from 'react'

import { initialSubState } from '../reducers/widgets'

import CardWidget from '../components/cards/CardWidget'

const defaultWidgetConfig = {
	WidgetComponent: CardWidget,
	additionalProps: {}
}

export default (props, widgetConfigs = []) => {

	const loaders = useMemo(() => {

		return widgetConfigs.map((widgetConfig) =>
			widgetConfig.loader
		)

	}, [ widgetConfigs ])

	useEffect(() => {

		props.fetchWidgets(props, loaders)

	}, [ loaders ])

	return loaders.map(
		(loader, index) => {
			const widgetId = loader.id

			// Ensure that the data is never empty, even when the widget is not ready or
			// still loading. Also initialize the value with the correct type using by
			// calling the enhancer without parameters.
			const widgetData = {
				...initialSubState(),
				value: loader.enhancer(),
				...(props.widgets.value[widgetId] || {})
			}

			const widgetConfig = {
				...defaultWidgetConfig,
				...widgetConfigs[index]
			}

			return h(widgetConfig.WidgetComponent, {
				key: widgetConfig.key || widgetId,
				widget: widgetData,
				...widgetConfig.additionalProps
			})
		}
	)

}