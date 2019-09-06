import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Favicon from '../Favicon'

import sumByProp from '../../utils/sumByProp'

const Row = (props) => {

	const hasBar = props.barWidth != null

	const faviconUrl = (new URL('/favicon.ico', props.url)).href
	const hostnameUrl = props.url.hostname
	const pathnameUrl = props.url.pathname

	return (
		h('a', {
			className: 'itemList__row',
			href: props.url.href,
			target: '_blank',
			onMouseEnter: props.onEnter,
			onMouseLeave: props.onLeave
		},
			h('div', {
				className: 'itemList__data'
			},
				hasBar === true && h('div', { className: 'itemList__bar', style: { '--width': `${ props.barWidth }%` } }),
				h(Favicon, { url: faviconUrl }),
				h('span', { className: 'itemList__hostname' }, hostnameUrl),
				h('span', { className: 'itemList__pathname' }, pathnameUrl)
			)
		)
	)

}

const PresentationIconList = (props) => {

	const totalCount = props.items.reduce(sumByProp('count'), 0)
	const hasCount = Number.isNaN(totalCount) === false
	const proportionalWidth = ({ count }) => (count / totalCount) * 100

	return (
		h('div', { className: 'itemList' },
			h('div', { className: 'itemList__inner' },
				props.items.map((item, index) => (
					h(Row, {
						key: item.url.href + index,
						barWidth: hasCount === true ? proportionalWidth(item) : undefined,
						onEnter: () => props.onEnter(index),
						onLeave: () => props.onLeave(index),
						...item
					})
				))
			)
		)
	)

}

PresentationIconList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	onEnter: PropTypes.func.isRequired,
	onLeave: PropTypes.func.isRequired
}

export default PresentationIconList