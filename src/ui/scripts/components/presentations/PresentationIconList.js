import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Favicon from '../Favicon'

import enhanceUrl from '../../enhancers/enhanceUrl'
import sumByProp from '../../utils/sumByProp'

const IconColumn = (props) => {

	const hasBar = props.barWidth != null

	return (
		h('div', { className: 'flexList__column flexList__column--spacing-right' },
			hasBar === true && h('div', {
				className: 'flexList__bar flexList__bar--favicon',
				style: { '--width': `${ props.barWidth }%` }
			}),
			h(Favicon, { url: props.faviconUrl })
		)
	)

}

const UrlRow = (props) => {

	const hostnameUrl = props.url.hostname
	const pathnameUrl = props.url.pathname

	return (
		h('a', {
			className: 'flexList__row',
			href: enhanceUrl(props.url).href,
			target: '_blank',
			rel: 'noopener',
			onMouseEnter: props.onEnter,
			onMouseLeave: props.onLeave
		},
			h(IconColumn, {
				barWidth: props.barWidth,
				faviconUrl: props.faviconUrl
			}),
			h('div', { className: 'flexList__column flexList__column--text-adjustment' },
				h('span', {}, hostnameUrl),
				h('span', { className: 'flexList__obscured' }, pathnameUrl)
			)
		)
	)

}

const TextRow = (props) => {

	return (
		h('a', {
			className: 'flexList__row flexList__row--has-hover',
			onMouseEnter: props.onEnter,
			onMouseLeave: props.onLeave
		},
			h(IconColumn, {
				barWidth: props.barWidth
			}),
			h('div', { className: 'flexList__column flexList__column--text-adjustment' },
				h('span', { className: 'flexList__truncated' }, props.text)
			)
		)
	)

}

const PresentationIconList = (props) => {

	const totalCount = props.items.reduce(sumByProp('count'), 0)
	const hasCount = Number.isNaN(totalCount) === false
	const proportionalWidth = ({ count }) => (count / totalCount) * 100

	return (
		h('div', { className: 'flexList' },
			h('div', { className: 'flexList__inner' },
				props.items.map((item, index) => {
					const commonProps = {
						key: item.text + index,
						barWidth: hasCount === true ? proportionalWidth(item) : undefined,
						onEnter: () => props.onEnter(index),
						onLeave: () => props.onLeave(index)
					}

					if (item.url == null) {
						return h(TextRow, {
							...commonProps,
							text: item.text
						})
					}

					return h(UrlRow, {
						...commonProps,
						faviconUrl: (new URL('/favicon.ico', item.url)).href,
						url: item.url
					})
				})
			)
		)
	)

}

PresentationIconList.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.object,
			text: PropTypes.string.isRequired,
			count: PropTypes.number
		})
	).isRequired,
	onEnter: PropTypes.func.isRequired,
	onLeave: PropTypes.func.isRequired
}

export default PresentationIconList