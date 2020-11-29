import { createElement as h, Fragment } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import enhanceLanguages from '../../enhancers/enhanceLanguages'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
import overviewRoute from '../../utils/overviewRoute'
import useWidgets from '../../utils/useWidgets'

import CardLanguages from '../cards/CardLanguages'

const RouteLanguages = (props) => {

	const widgets = useWidgets(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return (
		h(Fragment, {},

			widgets.map(
				(widget) => {
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardLanguages, {
						key: domain.id,
						headline: domain.title,
						range: widget.variables.range,
						sorting: widget.variables.sorting,
						loading: widget.fetching,
						items: enhanceLanguages(widget.value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteLanguages