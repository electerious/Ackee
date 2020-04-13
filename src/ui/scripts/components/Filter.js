import { createElement as h, Fragment, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
	ROUTE_VIEWS,
	ROUTE_PAGES,
	ROUTE_REFERRERS,
	ROUTE_DURATIONS,
	ROUTE_LANGUAGES,
	ROUTE_SIZES,
	ROUTE_SYSTEMS,
	ROUTE_SETTINGS,
	ROUTE_DEVICES,
	ROUTE_BROWSERS
} from '../constants/route'

import * as views from '../../../constants/views'
import * as pages from '../../../constants/pages'
import * as ranges from '../../../constants/ranges'

import Context from './Context'
import IconArrowDown from './icons/IconArrowDown'

const FilterItem = (props) => {

	const ref = useRef()
	const [ active, setActive ] = useState(false)

	const close = () => setActive(false)
	const toggle = () => setActive(!active)

	return (
		h(Fragment, {},
			h('button', {
				ref,
				className: 'filter__button color-white link',
				onClick: toggle
			},
				h('span', {}, props.label),
				h(IconArrowDown, { className: 'filter__arrow' })
			),
			active === true && h(Context, {
				targetRef: ref,
				// Manually calculated works better on mobile when element is sticky to the bottom
				bottom: () => `calc(4vh + 51px)`,
				right: (measurement) => `${ measurement.scrollWidth - measurement.right }px`,
				y: '-10px',
				floating: true,
				items: props.items,
				onItemClick: close,
				onAwayClick: close
			})
		)
	)

}

const Filter = (props) => {

	const rangeButton = {
		label: ({
			[ranges.RANGES_LAST_24_HOURS.value]: '24 hours',
			[ranges.RANGES_LAST_7_DAYS.value]: '7 days',
			[ranges.RANGES_LAST_30_DAYS.value]: '30 days',
			[ranges.RANGES_ALL_TIME.value]: 'All time'
		})[props.filter.range],
		items: [
			{
				label: '24 hours',
				description: 'Show last 24 hours',
				active: props.filter.range === ranges.RANGES_LAST_24_HOURS.value,
				onClick: () => props.setFilterRange(ranges.RANGES_LAST_24_HOURS.value)
			},
			{
				label: '7 days',
				description: 'Show last 7 days',
				active: props.filter.range === ranges.RANGES_LAST_7_DAYS.value,
				onClick: () => props.setFilterRange(ranges.RANGES_LAST_7_DAYS.value)
			},
			{
				label: '30 days',
				description: 'Show last 30 days',
				active: props.filter.range === ranges.RANGES_LAST_30_DAYS.value,
				onClick: () => props.setFilterRange(ranges.RANGES_LAST_30_DAYS.value)
			},
			{
				label: 'All time',
				description: 'Show all data',
				active: props.filter.range === ranges.RANGES_ALL_TIME.value,
				onClick: () => props.setFilterRange(ranges.RANGES_ALL_TIME.value)
			}
		]
	}

	const routesMap = {
		[ROUTE_VIEWS]: [
			{
				label: ({
					[views.VIEWS_TYPE_UNIQUE]: 'Unique',
					[views.VIEWS_TYPE_TOTAL]: 'Total'
				})[props.views.type],
				items: [
					{
						label: 'Unique',
						description: 'Unique site views',
						active: props.views.type === views.VIEWS_TYPE_UNIQUE,
						onClick: () => props.setViewsType(views.VIEWS_TYPE_UNIQUE)
					},
					{
						label: 'Total',
						description: 'Total page views',
						active: props.views.type === views.VIEWS_TYPE_TOTAL,
						onClick: () => props.setViewsType(views.VIEWS_TYPE_TOTAL)
					}
				]
			},
			{
				label: ({
					[views.VIEWS_INTERVAL_DAILY]: 'Daily',
					[views.VIEWS_INTERVAL_MONTHLY]: 'Monthly',
					[views.VIEWS_INTERVAL_YEARLY]: 'Yearly'
				})[props.views.interval],
				items: [
					{
						label: 'Daily',
						description: 'Grouped by day',
						active: props.views.interval === views.VIEWS_INTERVAL_DAILY,
						onClick: () => props.setViewsInterval(views.VIEWS_INTERVAL_DAILY)
					},
					{
						label: 'Monthly',
						description: 'Grouped by month',
						active: props.views.interval === views.VIEWS_INTERVAL_MONTHLY,
						onClick: () => props.setViewsInterval(views.VIEWS_INTERVAL_MONTHLY)
					},
					{
						label: 'Yearly',
						description: 'Grouped by year',
						active: props.views.interval === views.VIEWS_INTERVAL_YEARLY,
						onClick: () => props.setViewsInterval(views.VIEWS_INTERVAL_YEARLY)
					}
				]
			}
		],
		[ROUTE_PAGES]: [
			{
				label: ({
					[pages.PAGES_SORTING_TOP]: 'Top',
					[pages.PAGES_SORTING_RECENT]: 'Recent'
				})[props.pages.sorting],
				items: [
					{
						label: 'Top',
						description: 'Top page visits',
						active: props.pages.sorting === pages.PAGES_SORTING_TOP,
						onClick: () => props.setPagesSorting(pages.PAGES_SORTING_TOP)
					},
					{
						label: 'Recent',
						description: 'Recent page visits',
						active: props.pages.sorting === pages.PAGES_SORTING_RECENT,
						onClick: () => props.setPagesSorting(pages.PAGES_SORTING_RECENT)
					}
				]
			},
			rangeButton
		],
		[ROUTE_REFERRERS]: [
			rangeButton
		],
		[ROUTE_DURATIONS]: [
			rangeButton
		],
		[ROUTE_SYSTEMS]: [
			rangeButton
		],
		[ROUTE_DEVICES]: [
			rangeButton
		],
		[ROUTE_BROWSERS]: [
			rangeButton
		],
		[ROUTE_SIZES]: [
			rangeButton
		],
		[ROUTE_LANGUAGES]: [
			rangeButton
		]
	}

	const currentButtons = routesMap[props.route.value]

	if (currentButtons == null) return null

	const buttons = currentButtons.map((button) => h(FilterItem, button))

	return createPortal(
		h('div', { className: 'filter' }, ...buttons),
		document.body
	)

}

export default Filter