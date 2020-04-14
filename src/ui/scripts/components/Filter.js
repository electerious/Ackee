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
	ROUTE_BROWSERS,
	ROUTE_EVENTS
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
import * as events from '../../../constants/events'

import Context, { BUTTON, SEPARATOR } from './Context'
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
			[ranges.RANGES_LAST_24_HOURS]: '24 hours',
			[ranges.RANGES_LAST_7_DAYS]: '7 days',
			[ranges.RANGES_LAST_30_DAYS]: '30 days',
			[ranges.RANGES_ALL_TIME]: 'All time'
		})[props.filter.range],
		items: [
			{
				type: BUTTON,
				label: '24 hours',
				description: 'Show last 24 hours',
				active: props.filter.range === ranges.RANGES_LAST_24_HOURS,
				onClick: () => props.setFilterRange(ranges.RANGES_LAST_24_HOURS)
			},
			{
				type: BUTTON,
				label: '7 days',
				description: 'Show last 7 days',
				active: props.filter.range === ranges.RANGES_LAST_7_DAYS,
				onClick: () => props.setFilterRange(ranges.RANGES_LAST_7_DAYS)
			},
			{
				type: BUTTON,
				label: '30 days',
				description: 'Show last 30 days',
				active: props.filter.range === ranges.RANGES_LAST_30_DAYS,
				onClick: () => props.setFilterRange(ranges.RANGES_LAST_30_DAYS)
			},
			{
				type: BUTTON,
				label: 'All time',
				description: 'Show all data',
				active: props.filter.range === ranges.RANGES_ALL_TIME,
				onClick: () => props.setFilterRange(ranges.RANGES_ALL_TIME)
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
						type: BUTTON,
						label: 'Unique',
						description: 'Unique site views',
						active: props.views.type === views.VIEWS_TYPE_UNIQUE,
						onClick: () => props.setViewsType(views.VIEWS_TYPE_UNIQUE)
					},
					{
						type: BUTTON,
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
						type: BUTTON,
						label: 'Daily',
						description: 'Grouped by day',
						active: props.views.interval === views.VIEWS_INTERVAL_DAILY,
						onClick: () => props.setViewsInterval(views.VIEWS_INTERVAL_DAILY)
					},
					{
						type: BUTTON,
						label: 'Monthly',
						description: 'Grouped by month',
						active: props.views.interval === views.VIEWS_INTERVAL_MONTHLY,
						onClick: () => props.setViewsInterval(views.VIEWS_INTERVAL_MONTHLY)
					},
					{
						type: BUTTON,
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
						type: BUTTON,
						label: 'Top',
						description: 'Top page visits',
						active: props.pages.sorting === pages.PAGES_SORTING_TOP,
						onClick: () => props.setPagesSorting(pages.PAGES_SORTING_TOP)
					},
					{
						type: BUTTON,
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
			{
				label: ({
					[referrers.REFERRERS_SORTING_TOP]: 'Top',
					[referrers.REFERRERS_SORTING_NEW]: 'New',
					[referrers.REFERRERS_SORTING_RECENT]: 'Recent'
				})[props.referrers.sorting],
				items: [
					{
						type: BUTTON,
						label: 'Top',
						description: 'Top referrers',
						active: props.referrers.sorting === referrers.REFERRERS_SORTING_TOP,
						onClick: () => props.setReferrersSorting(referrers.REFERRERS_SORTING_TOP)
					},
					{
						type: BUTTON,
						label: 'New',
						description: 'New referrers',
						active: props.referrers.sorting === referrers.REFERRERS_SORTING_NEW,
						onClick: () => props.setReferrersSorting(referrers.REFERRERS_SORTING_NEW)
					},
					{
						type: BUTTON,
						label: 'Recent',
						description: 'Recent referrers',
						active: props.referrers.sorting === referrers.REFERRERS_SORTING_RECENT,
						onClick: () => props.setReferrersSorting(referrers.REFERRERS_SORTING_RECENT)
					}
				]
			},
			rangeButton
		],
		[ROUTE_DURATIONS]: [
			{
				label: ({
					[durations.DURATIONS_TYPE_AVERAGE]: 'Average',
					[durations.DURATIONS_TYPE_DETAILED]: 'Detailed'
				})[props.durations.type],
				items: [
					{
						type: BUTTON,
						label: 'Average',
						description: 'Average durations',
						active: props.durations.type === durations.DURATIONS_TYPE_AVERAGE,
						onClick: () => props.setDurationsType(durations.DURATIONS_TYPE_AVERAGE)
					},
					{
						type: BUTTON,
						label: 'Detailed',
						description: 'Detailed durations',
						active: props.durations.type === durations.DURATIONS_TYPE_DETAILED,
						onClick: () => props.setDurationsType(durations.DURATIONS_TYPE_DETAILED)
					}
				]
			}
		],
		[ROUTE_SYSTEMS]: [
			{
				label: ({
					[systems.SYSTEMS_SORTING_TOP]: 'Top',
					[systems.SYSTEMS_SORTING_RECENT]: 'Recent'
				})[props.systems.sorting],
				items: [
					{
						type: BUTTON,
						label: 'Top',
						description: 'Top systems',
						active: props.systems.sorting === systems.SYSTEMS_SORTING_TOP,
						onClick: () => props.setSystemsSorting(systems.SYSTEMS_SORTING_TOP)
					},
					{
						type: BUTTON,
						label: 'Recent',
						description: 'Recent systems',
						active: props.systems.sorting === systems.SYSTEMS_SORTING_RECENT,
						onClick: () => props.setSystemsSorting(systems.SYSTEMS_SORTING_RECENT)
					},
					{
						type: SEPARATOR
					},
					{
						type: BUTTON,
						label: ({
							[systems.SYSTEMS_TYPE_NO_VERSION]: 'Show version',
							[systems.SYSTEMS_TYPE_WITH_VERSION]: 'Hide version'
						})[props.systems.type],
						description: ({
							[systems.SYSTEMS_TYPE_NO_VERSION]: 'Include system version',
							[systems.SYSTEMS_TYPE_WITH_VERSION]: 'Don\'t include version'
						})[props.systems.type],
						onClick: () => props.setSystemsType(props.systems.type === systems.SYSTEMS_TYPE_NO_VERSION ? systems.SYSTEMS_TYPE_WITH_VERSION : systems.SYSTEMS_TYPE_NO_VERSION)
					}
				]
			},
			rangeButton
		],
		[ROUTE_DEVICES]: [
			{
				label: ({
					[devices.DEVICES_SORTING_TOP]: 'Top',
					[devices.DEVICES_SORTING_RECENT]: 'Recent'
				})[props.devices.sorting],
				items: [
					{
						type: BUTTON,
						label: 'Top',
						description: 'Top systems',
						active: props.devices.sorting === devices.DEVICES_SORTING_TOP,
						onClick: () => props.setDevicesSorting(devices.DEVICES_SORTING_TOP)
					},
					{
						type: BUTTON,
						label: 'Recent',
						description: 'Recent systems',
						active: props.devices.sorting === devices.DEVICES_SORTING_RECENT,
						onClick: () => props.setDevicesSorting(devices.DEVICES_SORTING_RECENT)
					},
					{
						type: SEPARATOR
					},
					{
						type: BUTTON,
						label: ({
							[devices.DEVICES_TYPE_NO_MODEL]: 'Show model',
							[devices.DEVICES_TYPE_WITH_MODEL]: 'Hide model'
						})[props.devices.type],
						description: ({
							[devices.DEVICES_TYPE_NO_MODEL]: 'Include device model',
							[devices.DEVICES_TYPE_WITH_MODEL]: 'Don\'t include model'
						})[props.devices.type],
						onClick: () => props.setDevicesType(props.devices.type === devices.DEVICES_TYPE_NO_MODEL ? devices.DEVICES_TYPE_WITH_MODEL : devices.DEVICES_TYPE_NO_MODEL)
					}
				]
			},
			rangeButton
		],
		[ROUTE_BROWSERS]: [
			{
				label: ({
					[browsers.BROWSERS_SORTING_TOP]: 'Top',
					[browsers.BROWSERS_SORTING_RECENT]: 'Recent'
				})[props.browsers.sorting],
				items: [
					{
						type: BUTTON,
						label: 'Top',
						description: 'Top systems',
						active: props.browsers.sorting === browsers.BROWSERS_SORTING_TOP,
						onClick: () => props.setBrowsersSorting(browsers.BROWSERS_SORTING_TOP)
					},
					{
						type: BUTTON,
						label: 'Recent',
						description: 'Recent systems',
						active: props.browsers.sorting === browsers.BROWSERS_SORTING_RECENT,
						onClick: () => props.setBrowsersSorting(browsers.BROWSERS_SORTING_RECENT)
					},
					{
						type: SEPARATOR
					},
					{
						type: BUTTON,
						label: ({
							[browsers.BROWSERS_TYPE_NO_VERSION]: 'Show version',
							[browsers.BROWSERS_TYPE_WITH_VERSION]: 'Hide version'
						})[props.browsers.type],
						description: ({
							[browsers.BROWSERS_TYPE_NO_VERSION]: 'Include browser version',
							[browsers.BROWSERS_TYPE_WITH_VERSION]: 'Don\'t include version'
						})[props.browsers.type],
						onClick: () => props.setBrowsersType(props.browsers.type === browsers.BROWSERS_TYPE_NO_VERSION ? browsers.BROWSERS_TYPE_WITH_VERSION : browsers.BROWSERS_TYPE_NO_VERSION)
					}
				]
			},
			rangeButton
		],
		[ROUTE_SIZES]: [
			{
				label: ({
					[sizes.SIZES_TYPE_BROWSER_RESOLUTION]: 'Browser sizes',
					[sizes.SIZES_TYPE_BROWSER_WIDTH]: 'Browser widths',
					[sizes.SIZES_TYPE_BROWSER_HEIGHT]: 'Browser heights',
					[sizes.SIZES_TYPE_SCREEN_RESOLUTION]: 'Screen sizes',
					[sizes.SIZES_TYPE_SCREEN_WIDTH]: 'Screen widths',
					[sizes.SIZES_TYPE_SCREEN_HEIGHT]: 'Screen heights'
				})[props.sizes.type],
				items: [
					{
						type: BUTTON,
						label: 'Browser sizes',
						description: 'Width and height combined',
						active: props.sizes.type === sizes.SIZES_TYPE_BROWSER_RESOLUTION,
						onClick: () => props.setSizesType(sizes.SIZES_TYPE_BROWSER_RESOLUTION)
					},
					{
						type: BUTTON,
						label: '↳ widths',
						active: props.sizes.type === sizes.SIZES_TYPE_BROWSER_WIDTH,
						onClick: () => props.setSizesType(sizes.SIZES_TYPE_BROWSER_WIDTH)
					},
					{
						type: BUTTON,
						label: '↳ heights',
						active: props.sizes.type === sizes.SIZES_TYPE_BROWSER_HEIGHT,
						onClick: () => props.setSizesType(sizes.SIZES_TYPE_BROWSER_HEIGHT)
					},
					{
						type: SEPARATOR
					},
					{
						type: BUTTON,
						label: 'Screen sizes',
						description: 'Width and height combined',
						active: props.sizes.type === sizes.SIZES_TYPE_SCREEN_RESOLUTION,
						onClick: () => props.setSizesType(sizes.SIZES_TYPE_SCREEN_RESOLUTION)
					},
					{
						type: BUTTON,
						label: '↳ widths',
						active: props.sizes.type === sizes.SIZES_TYPE_SCREEN_WIDTH,
						onClick: () => props.setSizesType(sizes.SIZES_TYPE_SCREEN_WIDTH)
					},
					{
						type: BUTTON,
						label: '↳ heights',
						active: props.sizes.type === sizes.SIZES_TYPE_SCREEN_HEIGHT,
						onClick: () => props.setSizesType(sizes.SIZES_TYPE_SCREEN_HEIGHT)
					}
				]
			},
			rangeButton
		],
		[ROUTE_LANGUAGES]: [
			{
				label: ({
					[languages.LANGUAGES_SORTING_TOP]: 'Top',
					[languages.LANGUAGES_SORTING_RECENT]: 'Recent'
				})[props.languages.sorting],
				items: [
					{
						type: BUTTON,
						label: 'Top',
						description: 'Top languages',
						active: props.languages.sorting === languages.LANGUAGES_SORTING_TOP,
						onClick: () => props.setLanguagesSorting(languages.LANGUAGES_SORTING_TOP)
					},
					{
						type: BUTTON,
						label: 'Recent',
						description: 'Recent languages',
						active: props.languages.sorting === languages.LANGUAGES_SORTING_RECENT,
						onClick: () => props.setLanguagesSorting(languages.LANGUAGES_SORTING_RECENT)
					}
				]
			},
			rangeButton
		],
		[ROUTE_EVENTS]: [
			{
				label: ({
					[events.EVENTS_TYPE_ACTIONS]: 'Actions',
					[events.EVENTS_TYPE_CATEGORIES]: 'Categories',
					[events.EVENTS_TYPE_COMBINED]: 'Both'
				})[props.events.type],
				items: [
					{
						type: BUTTON,
						label: 'Actions',
						active: props.events.type === events.EVENTS_TYPE_ACTIONS,
						onClick: () => props.setEventsType(events.EVENTS_TYPE_ACTIONS)
					},
					{
						type: BUTTON,
						label: 'Categories',
						active: props.events.type === events.EVENTS_TYPE_CATEGORIES,
						onClick: () => props.setEventsType(events.EVENTS_TYPE_CATEGORIES)
					},
					{
						type: BUTTON,
						label: 'Both',
						description: 'Show actions and categories combined',
						active: props.events.type === events.EVENTS_TYPE_COMBINED,
						onClick: () => props.setEventsType(events.EVENTS_TYPE_COMBINED)
					}
				]
			},
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