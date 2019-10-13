import { createElement as h, Fragment, useEffect } from 'react'

import {
	PAGES_SORTING_TOP,
	PAGES_SORTING_RECENT
} from '../../../../constants/pages'

import enhancePages from '../../utils/enhancePages'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardPages from '../cards/CardPages'
import Select from '../Select'

const RoutePages = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchPages(props, domain.data.id)
		})

	}, [ props.domains.value, props.pages.sorting ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.pages.sorting,
					onChange: (e) => props.setPagesSorting(e.target.value),
					items: [
						{ value: PAGES_SORTING_TOP, label: 'Top pages' },
						{ value: PAGES_SORTING_RECENT, label: 'Recent pages' }
					]
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardPages, {
						key: domain.data.id,
						headline: domain.data.title,
						sorting: props.pages.sorting,
						loading: props.pages.value[domain.data.id] == null ? false : props.pages.value[domain.data.id].fetching,
						items: props.pages.value[domain.data.id] == null ? [] : enhancePages(props.pages.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RoutePages