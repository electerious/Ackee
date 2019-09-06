import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Counter from '../Counter'

import sumByProp from '../../utils/sumByProp'

const Row = (props) => {

	return (
		h('a', {
			className: 'itemList__row',
			href: props.url.href,
			target: '_blank'
		},
			h('div', {
				className: 'itemList__data'
			},
				h('div', { className: 'itemList__bar', style: { '--width': `${ props.barWidth }%` } }),
				h(Counter, {}, props.count),
				h('span', { className: 'itemList__text' }, props.url.href)
			)
		)
	)

}

const PresentationCounterList = (props) => {

	const totalCount = props.items.reduce(sumByProp('count'), 0)
	const proportionalWidth = ({ count }) => (count / totalCount) * 100

	return (
		h('div', { className: 'itemList' },
			h('div', { className: 'itemList__inner' },
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

}

PresentationCounterList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PresentationCounterList