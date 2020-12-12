import { createElement as h, useMemo } from 'react'

import useCardWidgets from './useCardWidgets'
import domainRoute from '../utils/domainRoute'

export default (props, createLoader, opts) => {

	const widgetConfigs = useMemo(() => {

		return props.domains.value.map((domain) => ({
			loader: createLoader(domain.id, opts),
			additionalProps: {
				headline: domain.title,
				onMore: () => props.setRoute(domainRoute(domain))
			}
		}))

	}, [ props.domains.value, ...Object.values(opts) ])

	return useCardWidgets(props, widgetConfigs)

}