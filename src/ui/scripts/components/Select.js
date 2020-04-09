import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Select = (props) => {

	return (
		h('select', {
			className: 'select',
			value: props.value,
			onChange: props.onChange,
			disabled: props.disabled
		},
			props.items.map((item, index) => (
				h('option', {
					key: item.value + index,
					value: item.value
				}, item.label)
			))
		)
	)

}

Select.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired
}

export default Select