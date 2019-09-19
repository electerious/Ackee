import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Row = (props) => {

	return (
		h('div', {
			className: 'flexList__row'
		},
			h('div', { className: 'flexList__column flexList__column--text-adjustment' },
				h('span', { className: 'flexList__truncated' }, props.text)
			)
		)
	)

}

const PresentationList = (props) => {

	return (
		h('div', { className: 'flexList' },
			h('div', { className: 'flexList__inner' },
				props.items.map((item, index) => (
					h(Row, {
						key: item.text + index,
						...item
					})
				))
			)
		)
	)

}

PresentationList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PresentationList