import { useEffect, useState } from 'react'

export default (props, createLoader, opts) => {

	const [ widgetBundles, setWidgetBundles ] = useState([])

	useEffect(() => {

		const widgetBundles = props.domains.value.map(
			(domain) => {
				const loader = createLoader(domain.id, opts)
				props.fetchWidget(props, loader)

				return {
					domain,
					loader
				}
			}
		)

		setWidgetBundles(widgetBundles)

	}, [ props.domains.value, ...Object.values(opts) ])

	return widgetBundles

}