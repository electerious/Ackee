import { createElement as h, useEffect, useState } from 'react'

import CardWidget from '../components/cards/CardWidget'

import { initialSubState } from '../reducers/widgets'

export default (props, createLoader, opts, additionalProps = {}) => {

	const [ widgetId, setWidgetId ] = useState()

	useEffect(() => {

		const loader = createLoader(opts)
		props.fetchWidget(props, loader)

		setWidgetId(loader.id)

	}, [ ...Object.values(opts) ])

	const widgetData = props.widgets.value[widgetId] || initialSubState()

	return h(CardWidget, {
		key: widgetId,
		widget: widgetData,
		...additionalProps
	})

}