import { createElement as h, useMemo } from 'react'

import useCardWidgets from './useCardWidgets'

export default (props, createLoader, opts, additionalProps = {}) => {

	const widgetConfigs = useMemo(() => {

		return [{
			loader: createLoader(opts),
			additionalProps
		}]

	}, [ ...Object.values(opts) ])

	return useCardWidgets(props, widgetConfigs)

}