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
	ROUTE_DEVICES,
	ROUTE_BROWSERS
} from '../constants/route'

import * as views from '../../../constants/views'
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

	const routeKey = props.route.key

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
	const intervalsItem = createItem(labels.intervals[props.filter.interval], intervalsButtons)

	const routesMap = {
		[ROUTE_VIEWS.key]: [
			createItem(labels.views[props.views.type], [
				createButton('Unique', 'Unique site views', props.setViewsType, props.views.type, views.VIEWS_TYPE_UNIQUE),
				createButton('Total', 'Total page views', props.setViewsType, props.views.type, views.VIEWS_TYPE_TOTAL)
			]),
			intervalsItem
		],
		[ROUTE_PAGES.key]: [
			sortingItem,
			rangeItem
		],
		[ROUTE_REFERRERS.key]: [
			sortingItem,
			rangeItem
		],
		[ROUTE_DURATIONS.key]: [
			intervalsItem
		],
		[ROUTE_SYSTEMS.key]: [
			createItem(labels.sortings[props.filter.sorting], [
				...sortingButtons,
				createSeparator(),
				onlyInactiveButton(
					createButton('Show version', 'Include system version', props.setSystemsType, props.systems.type, systems.SYSTEMS_TYPE_WITH_VERSION),
					createButton('Hide version', 'Don\'t include version', props.setSystemsType, props.systems.type, systems.SYSTEMS_TYPE_NO_VERSION)
				)
			]),
			rangeItem
		],
		[ROUTE_DEVICES.key]: [
			createItem(labels.sortings[props.filter.sorting], [
				...sortingButtons,
				createSeparator(),
				onlyInactiveButton(
					createButton('Show model', 'Include device model', props.setDevicesType, props.devices.type, devices.DEVICES_TYPE_WITH_MODEL),
					createButton('Hide model', 'Don\'t include model', props.setDevicesType, props.devices.type, devices.DEVICES_TYPE_NO_MODEL)
				)
			]),
			rangeItem
		],
		[ROUTE_BROWSERS.key]: [
			createItem(labels.sortings[props.filter.sorting], [
				...sortingButtons,
				createSeparator(),
				onlyInactiveButton(
					createButton('Show version', 'Include browser version', props.setBrowsersType, props.browsers.type, browsers.BROWSERS_TYPE_WITH_VERSION),
					createButton('Hide version', 'Don\'t include version', props.setBrowsersType, props.browsers.type, browsers.BROWSERS_TYPE_NO_VERSION)
				)
			]),
			rangeItem
		],
		[ROUTE_SIZES.key]: [
			sortingItem,
			createItem(labels.sizes[props.sizes.type], [
				createButton('Browser sizes', 'Width and height combined', props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_BROWSER_RESOLUTION),
				createButton('↳ widths', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_BROWSER_WIDTH),
				createButton('↳ heights', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_BROWSER_HEIGHT),
				createSeparator(),
				createButton('Screen sizes', 'Width and height combined', props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_SCREEN_RESOLUTION),
				createButton('↳ widths', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_SCREEN_WIDTH),
				createButton('↳ heights', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_SCREEN_HEIGHT)
			]),
			rangeItem
		],
		[ROUTE_LANGUAGES.key]: [
			sortingItem,
			rangeItem
		]
	}

	const currentButtons = routesMap[routeKey]

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