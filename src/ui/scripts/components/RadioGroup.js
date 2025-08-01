import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'

const RadioGroup = (props) => {
	return (
		h('div', { className: 'radio-group' },
			props.items.map((item, index) => {
				const id = props.id + index
				return h('div', {
					className: 'control',
					key: `radio-group-item-${ item.value }`,
				},
					h('input', {
						type: 'radio',
						className: 'control__input',
						id,
						name: props.id,
						value: item.value,
						checked: item.value === props.value,
						required: props.required,
						disabled: props.disabled,
						onChange: props.onChange,
					}),
					h(Label, {
						htmlFor: id,
						className: 'control__label',
					}, item.label),
				)
			}),
		)
	)
}

RadioGroup.propTypes = {
	id: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export default RadioGroup