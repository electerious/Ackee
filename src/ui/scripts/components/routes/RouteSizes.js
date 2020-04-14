import { createElement as h, Fragment, useEffect } from 'react'

import enhanceSizes from '../../enhancers/enhanceSizes'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardSizes from '../cards/CardSizes'
import NoDomain from '../NoDomain'

const RouteSizes = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSizes(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.sizes.type ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				props.domains.value.map(
					(domain) => (
						h(CardSizes, {
							key: domain.data.id,
							range: props.filter.range,
							headline: domain.data.title,
							loading: props.sizes.value[domain.data.id] == null ? false : props.sizes.value[domain.data.id].fetching,
							items: props.sizes.value[domain.data.id] == null ? [] : enhanceSizes(props.sizes.value[domain.data.id].value)
						})
					)
				)
			)
		}

		if (!props.fetching) {
			return h(NoDomain, {
				addModalsModal: props.addModalsModal
			})
		}
	})()

	return (
		h(Fragment, {}, mainView)
	)

}

export default RouteSizes