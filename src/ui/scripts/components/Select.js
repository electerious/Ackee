import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Select = (props) => {

	return (
		h('select', {
			className: 'select',
			id: props.id,
			required: props.required,
			disabled: props.disabled,
			value: props.value,
			onChange: props.onChange
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
	id: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
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