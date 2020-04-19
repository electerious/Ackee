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
import * as pages from '../../../constants/pages'
import * as referrers from '../../../constants/referrers'
import * as durations from '../../../constants/durations'
import * as systems from '../../../constants/systems'
import * as devices from '../../../constants/devices'
import * as browsers from '../../../constants/browsers'
import * as sizes from '../../../constants/sizes'
import * as languages from '../../../constants/languages'
import * as ranges from '../../../constants/ranges'

import Context, { BUTTON, SEPARATOR } from './Context'
import IconArrowDown from './icons/IconArrowDown'

const labels = {
	[ranges.RANGES_LAST_24_HOURS]: '24 hours',
	[ranges.RANGES_LAST_7_DAYS]: '7 days',
	[ranges.RANGES_LAST_30_DAYS]: '30 days',
	[ranges.RANGES_ALL_TIME]: 'All time',
	[views.VIEWS_TYPE_UNIQUE]: 'Unique',
	[views.VIEWS_TYPE_TOTAL]: 'Total',
	[views.VIEWS_INTERVAL_DAILY]: 'Daily',
	[views.VIEWS_INTERVAL_MONTHLY]: 'Monthly',
	[views.VIEWS_INTERVAL_YEARLY]: 'Yearly',
	[pages.PAGES_SORTING_TOP]: 'Top',
	[pages.PAGES_SORTING_RECENT]: 'Recent',
	[referrers.REFERRERS_SORTING_TOP]: 'Top',
	[referrers.REFERRERS_SORTING_NEW]: 'New',
	[referrers.REFERRERS_SORTING_RECENT]: 'Recent',
	[durations.DURATIONS_TYPE_AVERAGE]: 'Average',
	[durations.DURATIONS_TYPE_DETAILED]: 'Detailed',
	[systems.SYSTEMS_SORTING_TOP]: 'Top',
	[systems.SYSTEMS_SORTING_RECENT]: 'Recent',
	[devices.DEVICES_SORTING_TOP]: 'Top',
	[devices.DEVICES_SORTING_RECENT]: 'Recent',
	[browsers.BROWSERS_SORTING_TOP]: 'Top',
	[browsers.BROWSERS_SORTING_RECENT]: 'Recent',
	[sizes.SIZES_TYPE_BROWSER_RESOLUTION]: 'Browser sizes',
	[sizes.SIZES_TYPE_BROWSER_WIDTH]: 'Browser widths',
	[sizes.SIZES_TYPE_BROWSER_HEIGHT]: 'Browser heights',
	[sizes.SIZES_TYPE_SCREEN_RESOLUTION]: 'Screen sizes',
	[sizes.SIZES_TYPE_SCREEN_WIDTH]: 'Screen widths',
	[sizes.SIZES_TYPE_SCREEN_HEIGHT]: 'Screen heights',
	[languages.LANGUAGES_SORTING_TOP]: 'Top',
	[languages.LANGUAGES_SORTING_RECENT]: 'Recent'
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
				// Manually calculated works better on mobile when element is sticky to the bottom
				bottom: () => `calc(4vh + 51px)`,
				left: (measurement) => `${ measurement.left + measurement.width / 2 }px`,
				x: '-50%',
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

	const shouldShowRange = (() => {

		if (props.route.value === ROUTE_PAGES && props.pages.sorting === pages.PAGES_SORTING_TOP) return true
		if (props.route.value === ROUTE_REFERRERS && props.referrers.sorting === referrers.REFERRERS_SORTING_TOP) return true
		if (props.route.value === ROUTE_SYSTEMS && props.systems.sorting === systems.SYSTEMS_SORTING_TOP) return true
		if (props.route.value === ROUTE_DEVICES && props.devices.sorting === devices.DEVICES_SORTING_TOP) return true
		if (props.route.value === ROUTE_BROWSERS && props.browsers.sorting === browsers.BROWSERS_SORTING_TOP) return true
		if (props.route.value === ROUTE_SIZES) return true
		if (props.route.value === ROUTE_LANGUAGES && props.languages.sorting === languages.LANGUAGES_SORTING_TOP) return true

		return false

	})()

	const rangeButton = createItem(labels[props.filter.range], [
		createButton('24 hours', 'Show last 24 hours', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_24_HOURS),
		createButton('7 days', 'Show last 7 days', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_7_DAYS),
		createButton('30 days', 'Show last 30 days', props.setFilterRange, props.filter.range, ranges.RANGES_LAST_30_DAYS),
		createButton('All time', 'Show all data', props.setFilterRange, props.filter.range, ranges.RANGES_ALL_TIME)
	], shouldShowRange === true)

	const routesMap = {
		[ROUTE_VIEWS]: [
			createItem(labels[props.views.type], [
				createButton('Unique', 'Unique site views', props.setViewsType, props.views.type, views.VIEWS_TYPE_UNIQUE),
				createButton('Total', 'Total page views', props.setViewsType, props.views.type, views.VIEWS_TYPE_TOTAL)
			]),
			createItem(labels[props.views.interval], [
				createButton('Daily', 'Grouped by day', props.setViewsInterval, props.views.interval, views.VIEWS_INTERVAL_DAILY),
				createButton('Monthly', 'Grouped by month', props.setViewsInterval, props.views.interval, views.VIEWS_INTERVAL_MONTHLY),
				createButton('Yearly', 'Grouped by year', props.setViewsInterval, props.views.interval, views.VIEWS_INTERVAL_YEARLY)
			])
		],
		[ROUTE_PAGES]: [
			createItem(labels[props.pages.sorting], [
				createButton('Top', 'Top page visits', props.setPagesSorting, props.pages.sorting, pages.PAGES_SORTING_TOP),
				createButton('Recent', 'Recent page visits', props.setPagesSorting, props.pages.sorting, pages.PAGES_SORTING_RECENT)
			]),
			rangeButton
		],
		[ROUTE_REFERRERS]: [
			createItem(labels[props.referrers.sorting], [
				createButton('Top', 'Top referrers', props.setReferrersSorting, props.referrers.sorting, referrers.REFERRERS_SORTING_TOP),
				createButton('New', 'New referrers', props.setReferrersSorting, props.referrers.sorting, referrers.REFERRERS_SORTING_NEW),
				createButton('Recent', 'Recent referrers', props.setReferrersSorting, props.referrers.sorting, referrers.REFERRERS_SORTING_RECENT)
			]),
			rangeButton
		],
		[ROUTE_DURATIONS]: [
			createItem(labels[props.durations.type], [
				createButton('Average', 'Average durations', props.setDurationsType, props.durations.type, durations.DURATIONS_TYPE_AVERAGE),
				createButton('Detailed', 'Detailed durations', props.setDurationsType, props.durations.type, durations.DURATIONS_TYPE_DETAILED)
			])
		],
		[ROUTE_SYSTEMS]: [
			createItem(labels[props.systems.sorting], [
				createButton('Top', 'Top systems', props.setSystemsSorting, props.systems.sorting, systems.SYSTEMS_SORTING_TOP),
				createButton('Recent', 'Recent systems', props.setSystemsSorting, props.systems.sorting, systems.SYSTEMS_SORTING_RECENT),
				createSeparator(),
				onlyInactiveButton(
					createButton('Show version', 'Include system version', props.setSystemsType, props.systems.type, systems.SYSTEMS_TYPE_WITH_VERSION),
					createButton('Hide version', 'Don\'t include version', props.setSystemsType, props.systems.type, systems.SYSTEMS_TYPE_NO_VERSION)
				)
			]),
			rangeButton
		],
		[ROUTE_DEVICES]: [
			createItem(labels[props.devices.sorting], [
				createButton('Top', 'Top systems', props.setDevicesSorting, props.devices.sorting, devices.DEVICES_SORTING_TOP),
				createButton('Recent', 'Recent systems', props.setDevicesSorting, props.devices.sorting, devices.DEVICES_SORTING_RECENT),
				createSeparator(),
				onlyInactiveButton(
					createButton('Show model', 'Include device model', props.setDevicesType, props.devices.type, devices.DEVICES_TYPE_WITH_MODEL),
					createButton('Hide model', 'Don\'t include model', props.setDevicesType, props.devices.type, devices.DEVICES_TYPE_NO_MODEL)
				)
			]),
			rangeButton
		],
		[ROUTE_BROWSERS]: [
			createItem(labels[props.browsers.sorting], [
				createButton('Top', 'Top systems', props.setBrowsersSorting, props.browsers.sorting, browsers.BROWSERS_SORTING_TOP),
				createButton('Recent', 'Recent systems', props.setBrowsersSorting, props.browsers.sorting, browsers.BROWSERS_SORTING_RECENT),
				createSeparator(),
				onlyInactiveButton(
					createButton('Show version', 'Include browser version', props.setBrowsersType, props.browsers.type, browsers.BROWSERS_TYPE_WITH_VERSION),
					createButton('Hide version', 'Don\'t include version', props.setBrowsersType, props.browsers.type, browsers.BROWSERS_TYPE_NO_VERSION)
				)
			]),
			rangeButton
		],
		[ROUTE_SIZES]: [
			createItem(labels[props.sizes.type], [
				createButton('Browser sizes', 'Width and height combined', props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_BROWSER_RESOLUTION),
				createButton('↳ widths', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_BROWSER_WIDTH),
				createButton('↳ heights', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_BROWSER_HEIGHT),
				createSeparator(),
				createButton('Screen sizes', 'Width and height combined', props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_SCREEN_RESOLUTION),
				createButton('↳ widths', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_SCREEN_WIDTH),
				createButton('↳ heights', undefined, props.setSizesType, props.sizes.type, sizes.SIZES_TYPE_SCREEN_HEIGHT)
			]),
			rangeButton
		],
		[ROUTE_LANGUAGES]: [
			createItem(labels[props.languages.sorting], [
				createButton('Top', 'Top languages', props.setLanguagesSorting, props.languages.sorting, languages.LANGUAGES_SORTING_TOP),
				createButton('Recent', 'Recent languages', props.setLanguagesSorting, props.languages.sorting, languages.LANGUAGES_SORTING_RECENT)
			]),
			rangeButton
		]
	}

	const currentButtons = routesMap[props.route.value]

	if (currentButtons == null) return null

	const buttons = currentButtons.map((button) => h(FilterItem, button))

	return createPortal(
		h('div', { className: 'filter' },
			h('div', { className: 'filter__bar' }, ...buttons)
		),
		document.body
	)

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

export default Filter