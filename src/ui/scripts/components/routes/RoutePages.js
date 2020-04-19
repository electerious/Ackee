import { createElement as h, Fragment, useEffect } from 'react'

import selectPagesValue from '../../selectors/selectPagesValue'
import enhancePages from '../../enhancers/enhancePages'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardPages from '../cards/CardPages'

const RoutePages = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchPages(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.pages.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardPages, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.pages.sorting,
						loading: selectPagesValue(props, domain.data.id).fetching,
						items: enhancePages(selectPagesValue(props, domain.data.id).value)
					})
				)
			)

		)
	)

}

export default RoutePages