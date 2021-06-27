import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import Label from '../Label'
import Spacer from '../Spacer'

import useUpdatePermanentToken from '../../api/hooks/permanentTokens/useUpdatePermanentToken'
import useDeletePermanentToken from '../../api/hooks/permanentTokens/useDeletePermanentToken'
import useInputs from '../../hooks/useInputs'
import commonModalProps from '../../utils/commonModalProps'
import shortId from '../../utils/shortId'

const ModalPermanentTokenEdit = (props) => {
	const updatePermanentToken = useUpdatePermanentToken(props.id)
	const deletePermanentToken = useDeletePermanentToken(props.id)

	const [ inputs, onInputChange ] = useInputs({
		title: props.title,
	})

	const onSubmit = (e) => {
		e.preventDefault()
		updatePermanentToken.mutate({
			variables: {
				input: inputs,
			},
		})
		props.closeModal()
	}

	const onDelete = (e) => {
		e.preventDefault()

		const c = confirm(`Are you sure you want to delete the permanent token "${ props.title }"? This action cannot be undone.`)
		if (c === false) return

		deletePermanentToken.mutate()
		props.closeModal()
	}

	const titleId = shortId()
	const idId = shortId()

	return (
		h('form', { className: 'card', onSubmit },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Permanent token title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					focused: true,
					placeholder: 'Permanent token title',
					value: inputs.title,
					onChange: onInputChange('title'),
				}),

				h(Label, { htmlFor: idId }, 'Permanent token id'),

				h(Input, {
					type: 'text',
					id: idId,
					readOnly: true,
					placeholder: 'Permanent token id',
					value: props.id,
					copyOnFocus: true,
				}),

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button link',
					onClick: props.closeModal,
				}, 'Close'),

				h('div', {
					className: 'card__separator ',
				}),

				h('button', {
					type: 'button',
					className: 'card__button link color-destructive',
					onClick: onDelete,
				}, 'Delete'),

				h('div', {
					className: 'card__separator ',
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
				}, 'Rename'),

			),
		)
	)
}

ModalPermanentTokenEdit.propTypes = {
	...commonModalProps,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}

export default ModalPermanentTokenEdit