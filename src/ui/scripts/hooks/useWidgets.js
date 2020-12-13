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

	const enhancedWidgetData = useMemo(() => {

		return loaders.map((loader) => {
			const widgetId = loader.id

			// The loader already contains most data required to render the widget.
			// We therefore don't need to wait until the remaining data is available through the store.
			return {
				...initialSubState(),
				// Initialize the value with the correct type by calling the enhancer without parameters.
				// This ensures that there's always an empty value with the correct type available to render.
				value: loader.enhancer(),
				Renderer: loader.Renderer,
				variables: loader.variables,
				// Overwrite the constructed data with the data in the store (when available).
				...(props.widgets.value[widgetId] || {})
			}
		})

	}, [ loaders, props.widgets.value ])

	const enhancedWidgetConfigs = useMemo(() => {

		return loaders.map((loader, index) => {
			return {
				...defaultWidgetConfig,
				...widgetConfigs[index]
			}
		})

	}, [ loaders, widgetConfigs ])

	useEffect(() => {

		props.fetchWidgets(props, loaders)

	}, [ loaders ])

	return loaders.map(
		(loader, index) => {
			const widgetId = loader.id
			const widgetState = enhancedWidgetData[index]
			const widgetConfig = enhancedWidgetConfigs[index]

			return h(widgetConfig.WidgetComponent, {
				key: widgetConfig.key || widgetId,
				widget: widgetState,
				...widgetConfig.additionalProps
			})
		}
	)

}