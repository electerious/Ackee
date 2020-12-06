import { createElement as h, useMemo } from 'react'

import { initialSubState } from '../reducers/widgets'

import CardWidget from '../components/cards/CardWidget'

export default (props, widgetConfigs = []) => {

	const widgetIds = useMemo(() => {

		const loaders = widgetConfigs.map((widgetConfig) =>
			widgetConfig.loader
		)

		const widgetIds = loaders.map((loader) =>
			loader.id
		)

		props.fetchWidgets(props, loaders)
		return widgetIds

		// TODO: Rerender when widgetConfigs changes
	}, [])

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