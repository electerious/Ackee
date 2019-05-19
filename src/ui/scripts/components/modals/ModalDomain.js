import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import Input from '../Input'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

const ModalDomain = (props) => {

	const [ inputs, setInputs ] = useState({
		title: props.title
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const copyInput = (e) => {
		e.target.select()
		document.execCommand('copy')
	}

	const updateDomain = (e) => {
		e.preventDefault()
		props.updateDomain(props.id, inputs).then(props.closeModal)
	}

	const deleteDomain = (e) => {
		e.preventDefault()
		const c = confirm(`Are you sure you want to delete the domain "${ props.title }"? This action cannot be undone.`)
		if (c === true) props.deleteDomain(props.id, inputs).then(props.closeModal)
	}

	const titleId = shortid.generate()
	const idId = shortid.generate()

	return (
		h('form', { className: 'card', onSubmit: updateDomain },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Domain title'),

				h(Input, {
					type: 'text',
					id: titleId,
					placeholder: 'Domain title',
					required: true,
					autoCapitalize: 'off',
					autoCorrect: 'off',
					value: inputs.title,
					onChange: onChange('title')
				}),

				h(Label, { htmlFor: idId }, 'Domain id'),

				h(Input, {
					type: 'text',
					id: idId,
					readOnly: true,
					placeholder: 'Domain id',
					onFocus: copyInput,
					value: props.id
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
					type: 'button',
					className: 'card__button link',
					onClick: deleteDomain
				}, 'Delete'),

				h('div', {
					className: 'card__separator'
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: props.fetching === true
				}, props.fetching === true ? h(Spinner) : 'Rename')

			)
		)
	)

}

ModalDomain.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	updateDomain: PropTypes.func.isRequired,
	deleteDomain: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
}

export default ModalDomain