import { createElement as h, Fragment, useEffect } from 'react'

import selectReferrersValue from '../../selectors/selectReferrersValue'
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
							loading: selectReferrersValue(props, domain.data.id).fetching,
							items: enhanceReferrers(selectReferrersValue(props, domain.data.id).value)
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

export default RouteReferrers