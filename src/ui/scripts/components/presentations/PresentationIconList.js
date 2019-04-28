import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Favicon from '../Favicon'

const Row = (props) => {

	const faviconUrl = (new URL('/favicon.ico', props.url)).href
	const hostnameUrl = props.url.hostname
	const pathnameUrl = props.url.pathname

	return (
		h('a', {
			className: 'iconList__row',
			href: props.url.href,
			target: '_blank',
			onMouseEnter: props.onEnter,
			onMouseLeave: props.onLeave
		},
			h(Favicon, faviconUrl),
			h('span', { className: 'iconList__hostname' }, hostnameUrl),
			h('span', { className: 'iconList__pathname' }, pathnameUrl)
		)
	)

}

const PresentationIconList = (props) => {

	return (
		h('div', { className: 'iconList' },
			h('div', { className: 'iconList__inner' },
				props.items.map((item, index) => (
					h(Row, {
						key: item.url.href + index,
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
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PresentationIconList