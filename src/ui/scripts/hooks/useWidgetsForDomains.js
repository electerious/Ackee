import { createElement as h, useMemo } from 'react'

import useWidgets from './useWidgets'

export default (props, createLoader, opts) => {

	const widgetConfigs = useMemo(() => {

		return props.domains.value.map((domain) => ({
			key: domain.id,
			loader: createLoader(domain.id, opts),
			additionalProps: {
				headline: domain.title,
				onMore: () => props.setRoute(`/domains/${ domain.id }`)
			}
		}))

	}, [ props.domains.value, ...Object.values(opts) ])

	return useWidgets(props, widgetConfigs)

}