import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
// import { useHotkeys } from 'react-hotkeys-hook'

import Input from '../Input'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

import shortId from '../../utils/shortId'

const ModalPermanentTokenAdd = (props) => {

	// Currently not possible:
	// https://github.com/JohannesKlauss/react-hotkeys-hook/issues/276
	// useHotkeys('esc', props.closeModal, {
	// 	filter: () => props.current === true
	// })

	const [ inputs, setInputs ] = useState({
		title: ''
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const addPermanentToken = (e) => {
		e.preventDefault()
		props.addPermanentToken(inputs).then(props.closeModal)
	}

	const titleId = shortId()

	return (
		h('form', { className: 'card', onSubmit: addPermanentToken },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Permanent token title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: props.fetching === true,
					focused: true,
					placeholder: 'Permanent token title',
					value: inputs.title,
					onChange: onChange('title')
				})

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button link',
					onClick: props.closeModal
				}, 'Close'),

				h('div', {
					className: 'card__separator '
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: props.fetching === true
				}, props.fetching === true ? h(Spinner) : 'Add')

			)
		)
	)

}

ModalPermanentTokenAdd.propTypes = {
	current: PropTypes.bool.isRequired,
	fetching: PropTypes.bool.isRequired,
	addPermanentToken: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
}

export default ModalPermanentTokenAdd