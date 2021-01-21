import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import * as events from '../../../../constants/events'

import Input from '../Input'
import Select from '../Select'
import Textarea from '../Textarea'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'
import Tooltip from '../Tooltip'

import commonModalProps from '../../utils/commonModalProps'
import shortId from '../../utils/shortId'

const ModalEventEdit = (props) => {

	const [ inputs, setInputs ] = useState({
		title: props.title,
		type: props.type
	})

	const onChange = (key) => (e) => setInputs({
		...inputs,
		[key]: e.target.value
	})

	const updateEvent = (e) => {
		e.preventDefault()
		props.updateEvent(props.id, inputs).then(props.closeModal)
	}

	const deleteEvent = (e) => {
		e.preventDefault()
		const c = confirm(`Are you sure you want to delete the event "${ props.title }"? This action cannot be undone.`)
		if (c === true) props.deleteEvent(props.id, inputs).then(props.closeModal)
	}

	const titleId = shortId()
	const typeId = shortId()
	const idId = shortId()
	const embedId = shortId()

	return (
		h('form', { className: 'card', onSubmit: updateEvent },
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

				h('div', { className: 'card__group' },
					h(Label, { spacing: false, htmlFor: typeId }, 'Event type'),
					h(Tooltip, {}, 'Specifies how the aggregated data will be displayed in the UI. Can be changed at any time.')
				),

				h(Select, {
					id: typeId,
					required: true,
					disabled: props.fetching === true,
					value: inputs.type,
					items: [
						{
							value: events.EVENTS_TYPE_TOTAL_CHART,
							label: 'Chart with total sums'
						},
						{
							value: events.EVENTS_TYPE_AVERAGE_CHART,
							label: 'Chart with average values'
						},
						{
							value: events.EVENTS_TYPE_TOTAL_LIST,
							label: 'List with total sums'
						},
						{
							value: events.EVENTS_TYPE_AVERAGE_LIST,
							label: 'List with average values'
						}
					],
					onChange: onChange('type')
				}),

				h(Label, { htmlFor: idId }, 'Event id'),

				h(Input, {
					type: 'text',
					id: idId,
					readOnly: true,
					placeholder: 'Event id',
					value: props.id,
					copyOnFocus: true
				}),

				h(Label, { htmlFor: embedId }, 'Usage example'),

				h(Textarea, {
					id: embedId,
					readOnly: true,
					rows: 3,
					value: `ackeeTracker.action('${ props.id }', { key: 'Click', value: '1' })`,
					copyOnFocus: true
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
					className: 'card__separator'
				}),

				h('button', {
					type: 'button',
					className: 'card__button link color-destructive',
					onClick: deleteEvent,
					disabled: props.active === false
				}, 'Delete'),

				h('div', {
					className: 'card__separator'
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: props.fetching === true || props.active === false
				}, props.fetching === true ? h(Spinner) : 'Save')

			)
		)
	)

}

ModalEventEdit.propTypes = {
	...commonModalProps,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired
}

export default ModalEventEdit