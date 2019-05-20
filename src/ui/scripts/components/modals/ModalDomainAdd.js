import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import Input from '../Input'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

const ModalDomainAdd = (props) => {

	const [ inputs, setInputs ] = useState({
		title: ''
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const addDomain = (e) => {
		e.preventDefault()
		props.addDomain(inputs).then(props.closeModal)
	}

	const titleId = shortid.generate()

	return (
		h('form', { className: 'card', onSubmit: addDomain },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Domain title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: props.fetching === true,
					focused: true,
					placeholder: 'Domain title',
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
					className: 'card__separator'
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: props.fetching === true
				}, props.fetching === true ? h(Spinner) : 'Add')

			)
		)
	)

}

ModalDomainAdd.propTypes = {
	fetching: PropTypes.bool.isRequired,
	addDomain: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
}

export default ModalDomainAdd