import { createElement as h, useMemo, useEffect } from 'react'

import { initialSubState } from '../reducers/widgets'

import CardWidget from '../components/cards/CardWidget'

export default (props, widgetConfigs = []) => {

	const enhancedWidgetConfigs = useMemo(() => {

		// Set defaults and overwrite with the config passed to the hook
		return widgetConfigs.map((widgetConfig) => ({
			key: widgetConfig.loader.id,
			WidgetComponent: CardWidget,
			additionalProps: {},
			...widgetConfig
		}))

	}, [ widgetConfigs ])

	const enhancedWidgetData = useMemo(() => {

		// The loader already contains most data required to render the widget.
		// We therefore don't need to wait until the remaining data is available through the store.
		return enhancedWidgetConfigs.map(({ loader }) => ({
			...initialSubState(),
			// Initialize the value with the correct type by calling the enhancer without parameters.
			// This ensures that there's always an empty value with the correct type available to render.
			value: loader.enhancer(),
			Renderer: loader.Renderer,
			variables: loader.variables,
			// Overwrite the constructed data with the data in the store (when available).
			...(props.widgets.value[loader.id] || {})
		}))

	}, [ enhancedWidgetConfigs, props.widgets.value ])

	useEffect(() => {

		// Fetch widgets in useEffect, because updating the state inside useMemo isn't allowed
		const loaders = widgetConfigs.map(({ loader }) => loader)
		props.fetchWidgets(props, loaders)

	}, [ enhancedWidgetConfigs ])

	return enhancedWidgetConfigs.map(
		(widgetConfig, index) => {
			const widgetState = enhancedWidgetData[index]

			return h(widgetConfig.WidgetComponent, {
				key: widgetConfig.key,
				widget: widgetState,
				...widgetConfig.additionalProps
			})
		}
	)

}