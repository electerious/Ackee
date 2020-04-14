import { createElement as h, Fragment, useEffect } from 'react'

import enhanceReferrers from '../../enhancers/enhanceReferrers'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardReferrers from '../cards/CardReferrers'
import NoDomain from '../NoDomain'

const RouteReferrers = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchReferrers(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.referrers.sorting ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				props.domains.value.map(
					(domain) => (
						h(CardReferrers, {
							key: domain.data.id,
							headline: domain.data.title,
							range: props.filter.range,
							sorting: props.referrers.sorting,
							loading: props.referrers.value[domain.data.id] == null ? false : props.referrers.value[domain.data.id].fetching,
							items: props.referrers.value[domain.data.id] == null ? [] : enhanceReferrers(props.referrers.value[domain.data.id].value)
						})
					)
				)
			)
		}

		return h(NoDomain, {
			addModalsModal: props.addModalsModal
		})

	})()

	return (
		h(Fragment, {}, mainView)
	)

}

export default RouteReferrers