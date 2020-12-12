import { createElement as h, useMemo } from 'react'

import useWidgets from './useWidgets'

export default (props, createLoader, opts, additionalProps = {}) => {

	const widgetConfigs = useMemo(() => {

		return [{
			loader: createLoader(opts),
			additionalProps
		}]

	}, [ ...Object.values(opts) ])

	return useWidgets(props, widgetConfigs)

}