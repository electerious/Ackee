import { createElement as h, useState } from 'react'

import Input from '../Input'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

import useCreatePermanentToken from '../../api/hooks/permanentTokens/useCreatePermanentToken'
import commonModalProps from '../../utils/commonModalProps'
import shortId from '../../utils/shortId'

const ModalPermanentTokenAdd = (props) => {

	const createPermanentToken = useCreatePermanentToken()

	const fetching = createPermanentToken.fetching === true

	const [ inputs, setInputs ] = useState({
		title: ''
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const onSubmit = (e) => {
		e.preventDefault()
		createPermanentToken.mutate({
			variables: {
				input: inputs
			}
		}).then(props.closeModal)
	}

	const titleId = shortId()

	return (
		h('form', { className: 'card', onSubmit },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Permanent token title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: fetching === true,
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
					onClick: props.closeModal,
					disabled: props.active === false
				}, 'Close'),

				h('div', {
					className: 'card__separator '
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: fetching === true || props.active === false
				}, fetching === true ? h(Spinner) : 'Add')

			)
		)
	)

}

ModalPermanentTokenAdd.propTypes = {
	...commonModalProps
}

export default ModalPermanentTokenAdd