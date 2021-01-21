import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const copyInput = (e) => {
	e.target.select()
	document.execCommand('copy')
}

const Textarea = (props) => {

	const textarea = h('textarea', {
		className: 'input',
		id: props.id,
		required: props.required,
		disabled: props.disabled,
		readOnly: props.readOnly,
		placeholder: props.placeholder,
		value: props.value,
		rows: props.rows,
		onChange: props.onChange,
		onFocus: props.copyOnFocus === true ? copyInput : undefined
	})

	if (props.copyOnFocus === true) return (
		h('div', {
			className: 'inputMessage',
			title: 'Copied to clipboard'
		}, textarea)
	)

	return textarea

}

Textarea.propTypes = {
	id: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	rows: PropTypes.number,
	onChange: PropTypes.func,
	copyOnFocus: PropTypes.bool
}

export default Textarea