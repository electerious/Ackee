import { createElement as h } from 'react'

import * as events from '../../../../constants/events'

import Input from '../Input'
import Select from '../Select'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'
import Tooltip from '../Tooltip'

import useCreateEvent from '../../api/hooks/events/useCreateEvent'
import useInputs from '../../hooks/useInputs'
import commonModalProps from '../../utils/commonModalProps'
import shortId from '../../utils/shortId'

const ModalEventAdd = (props) => {
	const createEvent = useCreateEvent()

	const loading = createEvent.loading === true

	const [ inputs, onInputChange ] = useInputs({
		title: '',
		type: events.EVENTS_TYPE_TOTAL_CHART,
	})

	const onSubmit = async (e) => {
		e.preventDefault()
		await createEvent.mutate({
			variables: {
				input: inputs,
			},
		})
		props.closeModal()
	}

	const titleId = shortId()
	const typeId = shortId()

	return (
		h('form', { className: 'card', onSubmit },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h(Label, { htmlFor: titleId }, 'Event title'),

				h(Input, {
					type: 'text',
					id: titleId,
					required: true,
					disabled: loading === true,
					focused: true,
					placeholder: 'Event title',
					value: inputs.title,
					onChange: onInputChange('title'),
				}),

				h('div', { className: 'card__group' },
					h(Label, { spacing: false, htmlFor: typeId }, 'Event type'),
					h(Tooltip, {}, 'Specifies how the aggregated data will be displayed in the UI. Can be changed at any time.'),
				),

				h(Select, {
					id: typeId,
					required: true,
					disabled: loading === true,
					value: inputs.type,
					items: [
						{
							value: events.EVENTS_TYPE_TOTAL_CHART,
							label: 'Chart with total sums',
						},
						{
							value: events.EVENTS_TYPE_AVERAGE_CHART,
							label: 'Chart with average values',
						},
						{
							value: events.EVENTS_TYPE_TOTAL_LIST,
							label: 'List with total sums',
						},
						{
							value: events.EVENTS_TYPE_AVERAGE_LIST,
							label: 'List with average values',
						},
					],
					onChange: onInputChange('type'),
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

ModalEventAdd.propTypes = {
	...commonModalProps,
}

export default ModalEventAdd