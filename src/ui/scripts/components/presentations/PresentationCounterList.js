import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import sumByProp from '../../utils/sumByProp'
import maxByProp from '../../utils/maxByProp'

const Row = (props) => {

	const hasUrl = props.url != null

	const rootType = hasUrl === true ? 'a' : 'div'
	const rootProps = hasUrl === true ? { href: props.url.href, target: '_blank', rel: 'noopener' } : {}

	return (
		h(rootType, {
			className: 'flexList__row',
			...rootProps
		},
			h('div', {
				className: 'flexList__column flexList__column--text-adjustment flexList__column--fixed-width flexList__column--spacing-left flexList__column--spacing-right',
				style: { '--width': `${ props.counterWidth }px` }
			},
				h('div', { className: 'flexList__bar flexList__bar--counter', style: { '--width': `${ props.barWidth }%` } }),
				h('span', { className: 'color-primary' }, `${ props.count }x`)
			),
			h('div', { className: 'flexList__column flexList__column--text-adjustment' },
				h('span', { className: 'flexList__truncated' }, props.text)
			)
		)
	)

}

const PresentationCounterList = (props) => {

	const totalCount = props.items.reduce(sumByProp('count'), 0)
	const proportionalWidth = ({ count }) => (count / totalCount) * 100

	const averageCharWidth = 9
	const counterWidth = (String(props.items.reduce(maxByProp('count'), 0)).length + 1) * averageCharWidth

	return (
		h('div', { className: 'flexList' },
			h('div', { className: 'flexList__inner' },
				props.items.map((item, index) => (
					h(Row, {
						key: item.text + index,
						barWidth: proportionalWidth(item),
						counterWidth,
						...item
					})
				))
			)
		)
	)

}

PresentationCounterList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		url: PropTypes.object,
		text: PropTypes.string.isRequired,
		count: PropTypes.number.isRequired
	})).isRequired
}

export default PresentationCounterList