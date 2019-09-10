import { createElement as h, Fragment } from 'react'
import PropTypes from 'prop-types'

import sumByProp from '../../utils/sumByProp'

const Row = (props) => {

	return (
		h(Fragment, {},
			h('a', {
				className: 'gridList__column gridList__column--leading',
				href: props.url.href,
				target: '_blank'
			},
				h('div', { className: 'gridList__bar', style: { '--width': `${ props.barWidth }%` } }),
				h('div', { className: 'color-main' }, `${ props.count }x`)
			),
			h('a', {
				className: 'gridList__column',
				href: props.url.href,
				target: '_blank'
			},
				h('div', { className: 'gridList__truncated' }, props.url.href)
			)
		)
	)

}

const PresentationCounterList = (props) => {

	const totalCount = props.items.reduce(sumByProp('count'), 0)
	const proportionalWidth = ({ count }) => (count / totalCount) * 100

	return (
		h('div', { className: 'gridList' },
			h('div', { className: 'gridList__inner' },
				h('div', { className: 'gridList__grid' },
					props.items.map((item, index) => (
						h(Row, {
							key: item.url.href + index,
							barWidth: proportionalWidth(item),
							...item
						})
					))
				)
			)
		)
	)

}

PresentationCounterList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PresentationCounterList