import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
// import { useHotkeys } from 'react-hotkeys-hook'

import * as events from '../../../../constants/events'

import Input from '../Input'
import Select from '../Select'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

import shortId from '../../utils/shortId'

const ModalEventAdd = (props) => {

	// Currently not possible:
	// https://github.com/JohannesKlauss/react-hotkeys-hook/issues/276
	// useHotkeys('esc', props.closeModal, {
	// 	filter: () => props.current === true
	// })

	const [ inputs, setInputs ] = useState({
		title: '',
		type: events.EVENTS_TYPE_CHART
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const addEvent = (e) => {
		e.preventDefault()
		props.addEvent(inputs).then(props.closeModal)
	}

	const titleId = shortId()
	const typeId = shortId()

	return (
		h('form', { className: 'card', onSubmit: addEvent },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Event title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: props.fetching === true,
					focused: true,
					placeholder: 'Event title',
					value: inputs.title,
					onChange: onChange('title')
				}),

				h(Label, { htmlFor: typeId }, 'Event type'),

				h(Select, {
					id: typeId,
					required: true,
					disabled: props.fetching === true,
					value: inputs.type,
					items: [
						{
							value: events.EVENTS_TYPE_CHART,
							label: 'Chart'
						},
						{
							value: events.EVENTS_TYPE_LIST,
							label: 'List'
						}
					],
					onChange: onChange('type')
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

ModalEventAdd.propTypes = {
	current: PropTypes.bool.isRequired,
	fetching: PropTypes.bool.isRequired,
	addEvent: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
}

export default ModalEventAdd