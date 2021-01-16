import { createElement as h, Fragment, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import * as routes from '../constants/routes'
import useRoute from '../hooks/useRoute'

import * as views from '../../../constants/views'
import * as referrers from '../../../constants/referrers'
import * as systems from '../../../constants/systems'
import * as devices from '../../../constants/devices'
import * as browsers from '../../../constants/browsers'
import * as sizes from '../../../constants/sizes'
import * as sortings from '../../../constants/sortings'
import * as ranges from '../../../constants/ranges'
import * as intervals from '../../../constants/intervals'

import Context, { BUTTON, SEPARATOR } from './Context'
import IconArrowDown from './icons/IconArrowDown'

const labels = {
	sortings: {
		[sortings.SORTINGS_TOP]: 'Top',
		[sortings.SORTINGS_NEW]: 'New',
		[sortings.SORTINGS_RECENT]: 'Recent'
	},
	ranges: {
		[ranges.RANGES_LAST_24_HOURS]: '24 hours',
		[ranges.RANGES_LAST_7_DAYS]: '7 days',
		[ranges.RANGES_LAST_30_DAYS]: '30 days',
		[ranges.RANGES_LAST_6_MONTHS]: '6 months'
	},
	intervals: {
		[intervals.INTERVALS_DAILY]: 'Daily',
		[intervals.INTERVALS_MONTHLY]: 'Monthly',
		[intervals.INTERVALS_YEARLY]: 'Yearly'
	},
	views: {
		[views.VIEWS_TYPE_UNIQUE]: 'Unique',
		[views.VIEWS_TYPE_TOTAL]: 'Total'
	},
	referrers: {
		[referrers.REFERRERS_TYPE_WITH_SOURCE]: 'Combined',
		[referrers.REFERRERS_TYPE_NO_SOURCE]: 'Referrers',
		[referrers.REFERRERS_TYPE_ONLY_SOURCE]: 'Sources'
	},
	sizes: {
		[sizes.SIZES_TYPE_BROWSER_RESOLUTION]: 'Browser sizes',
		[sizes.SIZES_TYPE_BROWSER_WIDTH]: 'Browser widths',
		[sizes.SIZES_TYPE_BROWSER_HEIGHT]: 'Browser heights',
		[sizes.SIZES_TYPE_SCREEN_RESOLUTION]: 'Screen sizes',
		[sizes.SIZES_TYPE_SCREEN_WIDTH]: 'Screen widths',
		[sizes.SIZES_TYPE_SCREEN_HEIGHT]: 'Screen heights'
	}
}

const calculateX = (measurement) => {

	const padding = 10

	return Math.max(
		padding,
		Math.min(
			// Ensure that the context stays on the screen
			measurement.body.width - measurement.element.width - padding,
			// Ensure that the context is pinned to the target
			measurement.target.relative.x + measurement.target.width / 2 - measurement.element.width / 2
		)
	)

}

const calculateY = (measurement) => {
	return measurement.target.relative.y - measurement.element.height - 10
}

const createItem = (label, items, visible = true) => ({
	label,
	items,
	visible
})

const createButton = (label, description, setter, key, value) => ({
	type: BUTTON,
	label,
	description,
	active: key === value,
	onClick: () => setter(value)
})

const createSeparator = () => ({
	type: SEPARATOR
})

const onlyInactiveButton = (...buttons) => {
	return buttons.find((button) => button.active === false)
}

const FilterItem = (props) => {

	const ref = useRef()
	const [ active, setActive ] = useState(false)

	const close = () => setActive(false)
	const toggle = () => setActive(!active)

	if (props.visible === false) return null

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
				fixed: true,
				x: calculateX,
				y: calculateY,
				floating: true,
				items: props.items,
				onItemClick: close,
				onAwayClick: close
			})
		)
	)

}

const Filter = (props) => {

	const sortingButtons = [
		createButton('Top', 'Top entries first', props.setFilterSorting, props.filter.sorting, sortings.SORTINGS_TOP),
		createButton('New', 'New entries only', props.setFilterSorting, props.filter.sorting, sortings.SORTINGS_NEW),
		createButton('Recent', 'Entries sorted by time', props.setFilterSorting, props.filter.sorting, sortings.SORTINGS_RECENT)
	]

	const rangeButtons = [
		createButton('24 hours', 'Show last 24 hours', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_24_HOURS),
		createButton('7 days', 'Show last 7 days', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_7_DAYS),
		createButton('30 days', 'Show last 30 days', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_30_DAYS),
		createButton('6 months', 'Show last 6 months', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_6_MONTHS)
	]

	const intervalsButtons = [
		createButton('Daily', 'Grouped by day', props.setFilterInterval, props.filter.interval, intervals.INTERVALS_DAILY),
		createButton('Monthly', 'Grouped by month', props.setFilterInterval, props.filter.interval, intervals.INTERVALS_MONTHLY),
		createButton('Yearly', 'Grouped by year', props.setFilterInterval, props.filter.interval, intervals.INTERVALS_YEARLY)
	]

	const sortingItem = createItem(labels.sortings[props.filter.sorting], sortingButtons)
	const rangeItem = createItem(labels.ranges[props.filter.range], rangeButtons, props.filter.sorting === sortings.SORTINGS_TOP)
	const intervalItem = createItem(labels.intervals[props.filter.interval], intervalsButtons)

	const routesMap = {
		[routes.VIEWS]: [
			createItem(labels.views[props.filter.viewsType], [
				createButton('Unique', 'Unique site views', props.setFilterViewsType, props.filter.viewsType, views.VIEWS_TYPE_UNIQUE),
				createButton('Total', 'Total page views', props.setFilterViewsType, props.filter.viewsType, views.VIEWS_TYPE_TOTAL)
			]),
			intervalItem
		],
		[routes.PAGES]: [
			sortingItem,
			rangeItem
		],
		[routes.REFERRERS]: [
			sortingItem,
			createItem(labels.referrers[props.filter.referrersType], [
				createButton('Combined', 'Prefer source parameter', props.setFilterReferrersType, props.filter.referrersType, referrers.REFERRERS_TYPE_WITH_SOURCE),
				createButton('↳ referrers only', undefined, props.setFilterReferrersType, props.filter.referrersType, referrers.REFERRERS_TYPE_NO_SOURCE),
				createButton('↳ sources only', undefined, props.setFilterReferrersType, props.filter.referrersType, referrers.REFERRERS_TYPE_ONLY_SOURCE)
			]),
			rangeItem
		],
		[routes.DURATIONS]: [
			intervalItem
		],
		[routes.EVENTS]: [
			intervalItem,
			sortingItem
		],
		[routes.SYSTEMS]: [
			createItem(labels.sortings[props.filter.sorting], [
				...sortingButtons,
				createSeparator(),
				onlyInactiveButton(
					createButton('Show version', 'Include system version', props.setFilterSystemsType, props.filter.systemsType, systems.SYSTEMS_TYPE_WITH_VERSION),
					createButton('Hide version', 'Don\'t include version', props.setFilterSystemsType, props.filter.systemsType, systems.SYSTEMS_TYPE_NO_VERSION)
				)
			]),
			rangeItem
		],
		[routes.DEVICES]: [
			createItem(labels.sortings[props.filter.sorting], [
				...sortingButtons,
				createSeparator(),
				onlyInactiveButton(
					createButton('Show model', 'Include device model', props.setFilterDevicesType, props.filter.devicesType, devices.DEVICES_TYPE_WITH_MODEL),
					createButton('Hide model', 'Don\'t include model', props.setFilterDevicesType, props.filter.devicesType, devices.DEVICES_TYPE_NO_MODEL)
				)
			]),
			rangeItem
		],
		[routes.BROWSERS]: [
			createItem(labels.sortings[props.filter.sorting], [
				...sortingButtons,
				createSeparator(),
				onlyInactiveButton(
					createButton('Show version', 'Include browser version', props.setFilterBrowsersType, props.filter.browsersType, browsers.BROWSERS_TYPE_WITH_VERSION),
					createButton('Hide version', 'Don\'t include version', props.setFilterBrowsersType, props.filter.browsersType, browsers.BROWSERS_TYPE_NO_VERSION)
				)
			]),
			rangeItem
		],
		[routes.SIZES]: [
			sortingItem,
			createItem(labels.sizes[props.filter.sizesType], [
				createButton('Browser sizes', 'Width and height combined', props.setFilterSizesType, props.filter.sizesType, sizes.SIZES_TYPE_BROWSER_RESOLUTION),
				createButton('↳ widths', undefined, props.setFilterSizesType, props.filter.sizesType, sizes.SIZES_TYPE_BROWSER_WIDTH),
				createButton('↳ heights', undefined, props.setFilterSizesType, props.filter.sizesType, sizes.SIZES_TYPE_BROWSER_HEIGHT),
				createSeparator(),
				createButton('Screen sizes', 'Width and height combined', props.setFilterSizesType, props.filter.sizesType, sizes.SIZES_TYPE_SCREEN_RESOLUTION),
				createButton('↳ widths', undefined, props.setFilterSizesType, props.filter.sizesType, sizes.SIZES_TYPE_SCREEN_WIDTH),
				createButton('↳ heights', undefined, props.setFilterSizesType, props.filter.sizesType, sizes.SIZES_TYPE_SCREEN_HEIGHT)
			]),
			rangeItem
		],
		[routes.LANGUAGES]: [
			sortingItem,
			rangeItem
		]
	}

	const currentRoute = useRoute(props.route)
	const currentButtons = routesMap[currentRoute.key]

	if (currentButtons == null) return null

	const buttons = currentButtons.map((button) => h(FilterItem, button))

	return createPortal(
		h('div', { className: 'filter' },
			h('div', { className: 'filter__bar' }, ...buttons)
		),
		document.body
	)

}

export default Filter