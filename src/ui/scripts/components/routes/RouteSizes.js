import { createElement as h, Fragment, useEffect } from 'react'

import selectSizesValue from '../../selectors/selectSizesValue'
import enhanceSizes from '../../enhancers/enhanceSizes'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardSizes from '../cards/CardSizes'

const RouteSizes = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSizes(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.sizes.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardSizes, {
						key: domain.data.id,
						range: props.filter.range,
						headline: domain.data.title,
						loading: props.domains.fetching || selectSizesValue(props, domain.data.id).fetching,
						items: enhanceSizes(selectSizesValue(props, domain.data.id).value)
					})
				)
			)

		)
	)

}

export default RouteSizes