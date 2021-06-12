import { createElement as h } from 'react'

import Input from '../Input'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

import useCreateDomain from '../../api/hooks/domains/useCreateDomain'
import useInputs from '../../hooks/useInputs'
import commonModalProps from '../../utils/commonModalProps'
import shortId from '../../utils/shortId'

const ModalDomainAdd = (props) => {
	const createDomain = useCreateDomain()

	const loading = createDomain.loading === true

	const [ inputs, onInputChange ] = useInputs({
		title: '',
	})

	const onSubmit = async (e) => {
		e.preventDefault()
		await createDomain.mutate({
			variables: {
				input: inputs,
			},
		})
		props.closeModal()
	}

	const titleId = shortId()

	return (
		h('form', { className: 'card', onSubmit },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Domain title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: loading === true,
					focused: true,
					placeholder: 'Domain title',
					value: inputs.title,
					onChange: onInputChange('title'),
				}),

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button link',
					onClick: props.closeModal,
				}, 'Close'),

				h('div', {
					className: 'card__separator',
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: loading === true,
				}, loading === true ? h(Spinner) : 'Add'),

			),
		)
	)
}

ModalDomainAdd.propTypes = {
	...commonModalProps,
}

export default ModalDomainAdd