import { createElement as h, Fragment, useEffect } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'

import enhanceViews from '../../enhancers/enhanceViews'
import mergeViews from '../../utils/mergeViews'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardViews from '../cards/CardViews'
import NoDomain from '../NoDomain'

const RouteViews = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchViews(props, domain.data.id)
		})

	}, [ props.domains.value, props.views.type, props.views.interval ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				h(CardViews, {
					wide: true,
					headline: ({
						[VIEWS_TYPE_UNIQUE]: 'Site Views',
						[VIEWS_TYPE_TOTAL]: 'Page Views'
					})[props.views.type],
					interval: props.views.interval,
					items: mergeViews(props.domains, props.views)
				}),

				props.domains.value.map(
					(domain) => (
						h(CardViews, {
							key: domain.data.id,
							headline: domain.data.title,
							interval: props.views.interval,
							items: props.views.value[domain.data.id] == null ? [] : enhanceViews(props.views.value[domain.data.id].value, 7, props.views.interval)
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

export default RouteViews