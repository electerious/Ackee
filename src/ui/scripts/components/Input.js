import { createElement as h, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const copyInput = (e) => {
	e.target.select()
	document.execCommand('copy')
}

const Input = (props) => {

	const ref = useRef(null)

	useEffect(() => {
		if (props.focused === true) ref.current.focus()
	}, [])

	const type = ({
		text: 'text',
		username: 'text',
		password: 'password'
	})[props.type]

	const autoComplete = ({
		text: undefined,
		username: 'username',
		password: 'current-password'
	})[props.type]

	const input = h('input', {
		ref,
		className: 'input',
		autoCapitalize: 'off',
		autoCorrect: 'off',
		autoComplete,
		type,
		id: props.id,
		required: props.required,
		disabled: props.disabled,
		readOnly: props.readOnly,
		placeholder: props.placeholder,
		value: props.value,
		onChange: props.onChange,
		onFocus: props.copyOnFocus === true ? copyInput : undefined
	})

	if (props.copyOnFocus === true) return (
		h('div', {
			className: 'inputMessage',
			title: 'Copied to clipboard'
		}, input)
	)

	return input

}

Input.propTypes = {
	type: PropTypes.oneOf([ 'text', 'username', 'password' ]).isRequired,
	id: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	focused: PropTypes.bool,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	copyOnFocus: PropTypes.bool
}

export default Input