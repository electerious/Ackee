import { createElement as h, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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
		hidden: 'hidden',
		range: 'range',
		text: 'text',
		username: 'text',
		password: 'password',
	})[props.type]

	const autoComplete = ({
		text: undefined,
		username: 'username',
		password: 'current-password',
	})[props.type]

	const input = h('input', {
		ref,
		className: classNames('input', props.className),
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
		onFocus: props.copyOnFocus === true ? copyInput : undefined,
		min: props.min,
		max: props.max,
		step: props.step,
	})

	if (props.copyOnFocus === true) return (
		h('div', {
			className: 'inputMessage',
			title: 'Copied to clipboard',
		}, input)
	)

	return input
}

Input.propTypes = {
	type: PropTypes.oneOf([ 'text', 'username', 'password', 'hidden', 'range' ]).isRequired,
	className: PropTypes.string,
	id: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	focused: PropTypes.bool,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	copyOnFocus: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
}

export default Input