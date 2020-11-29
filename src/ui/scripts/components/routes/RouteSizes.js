import { createElement as h, Fragment } from 'react'

import sizesLoader from '../../loaders/sizesLoader'
import enhanceSizes from '../../enhancers/enhanceSizes'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgets from '../../utils/useWidgets'

import CardSizes from '../cards/CardSizes'

const RouteSizes = (props) => {

	const widgets = useWidgets(props, sizesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.sizesType
	})

	return (
		h(Fragment, {},

			widgets.map(
				(widget) => {
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardSizes, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceSizes(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteSizes