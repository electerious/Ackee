import React, { createElement as h, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { hour, minute, second } from '../../../../utils/times'

import Input from '../Input'
import Label from '../Label'
import Spacer from '../Spacer'
import Tooltip from '../Tooltip'

import useSetConstant from '../../api/hooks/constants/useSetConstant'
import useInputs from '../../hooks/useInputs'
import commonModalProps from '../../utils/commonModalProps'
import shortId from '../../utils/shortId'
import RadioGroup from '../RadioGroup'

const titleHintMap = new Map([
	[ 'DURATIONS_INTERVAL', 'Specifies time granularity in analytics. It does not impact client scripts like Ackee tracker.' ],
	[ 'DURATIONS_LIMIT', 'Specifies max duration of page view in analytics. Longer sessions would be ignored.' ],
])
const timeMultiplierMap = new Map([
	[ 'hours', hour ],
	[ 'minutes', minute ],
	[ 'seconds', second ],
])

const useTuneRangeValue = () => {
	const [ lastDivisor, updateDivisor ] = useState(0)
	const isDivisorChanged = (divisor) => lastDivisor !== 0 && lastDivisor !== divisor
	const getRatio = (threshold, divisor, object) => {
		const { max, min, value } = object
		if (value < threshold) {
			if (isDivisorChanged(divisor)) {
				return divisor === hour ? min : max
			}
			return value
		}
		return value / divisor
	}
	return (threshold, divisor, object) => {
		const { min, max, step } = object
		const ratio = getRatio(threshold, divisor, object)
		const discreteValue = ratio % step === 0 ? ratio : step * Math.round(ratio / step)
		updateDivisor(divisor)

		return {
			...object,
			value: `${ Math.max(min, Math.min(discreteValue, max)) }`,
		}
	}
}

const UnitRadioGroup = ({ name, unit, onInputChange }) => {
	const id = shortId()
	if ([ 'DURATIONS_INTERVAL' ].includes(name)) return h(Input, {
		type: 'hidden',
		id,
		required: true,
		readOnly: true,
		placeholder: '',
		value: unit,
	})

	return h(React.Fragment, {},
		h('div', { className: 'card__group' },
			h(Label, { spacing: false, htmlFor: id }, 'Constant unit'),
			h(Tooltip, {}, 'Specifies how the constant value will be displayed in the UI. Can be changed at any time.'),
		),
		h(RadioGroup, {
			id,
			required: true,
			value: unit,
			items: [
				{
					value: 'minutes',
					label: 'minutes',
				},
				{
					value: 'hours',
					label: 'hours',
				},
			],
			onChange: onInputChange('unit'),
		}),
	)
}

const ModalConstantEdit = (props) => {
	const setConstant = useSetConstant()

	const [ inputs, onInputChange ] = useInputs({
		name: props.name,
		value: props.value,
		unit: props.unit,
	})
	const tuneValue = useTuneRangeValue()
	const range = useMemo(() => {
		const value = parseInt(inputs.value)
		switch (inputs.unit) {
			case 'hours':
				return tuneValue(second, hour, {
					min: 1,
					max: 12,
					value,
					step: 1,
				})
			case 'minutes':
				return tuneValue(second, minute, {
					min: 5,
					max: 55,
					value,
					step: 5,
				})
			case 'seconds':
				return tuneValue(second, second, {
					min: 2,
					max: 60,
					value,
					step: 1,
				})
			default:
				throw new Error(`unexpected ${ inputs.value } unit`)
		}
	}, [ inputs.value, inputs.unit ])
	const ms = useMemo(() => {
		return range.value * timeMultiplierMap.get(inputs.unit)
	}, [ range.value, inputs.unit ])

	const onSubmit = (e) => {
		e.preventDefault()
		setConstant.mutate({
			variables: {
				input: {
					id: inputs.name,
					value: ms,
					unit: inputs.unit,
				},
			},
		})
		props.closeModal()
	}

	const titleId = shortId()
	const nameId = shortId()
	const valueId = shortId()

	return (
		h('form', { className: 'card', onSubmit },
			h('div', { className: 'card__inner' },

				h(Spacer, { size: 0.5 }),

				h('div', { className: 'card__group', style: {
					alignItems: 'baseline',
					justifyContent: 'center',
				} },
					h(Label, { htmlFor: titleId }, props.title),
					h(Tooltip, {}, titleHintMap.get(inputs.name)),
				),

				h(UnitRadioGroup, {
					name: inputs.name,
					unit: inputs.unit,
					onInputChange,
				}),

				h(Spacer, { size: 0.8 }),

				h(Input, {
					type: 'hidden',
					id: nameId,
					required: true,
					readOnly: true,
					placeholder: '',
					value: inputs.name,
				}),

				h(Label, { htmlFor: valueId }, 'Constant value'),

				h('div', { className: 'range' },
					h(Input, {
						type: 'range',
						id: valueId,
						required: true,
						className: 'range__input',
						placeholder: '',
						...range,
						onChange: onInputChange('value'),
					}),
					h(Label, { htmlFor: valueId, className: 'range__label' }, `${ range.value } ${ inputs.unit }`),
				),
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
				}, 'Save'),
			),
		)
	)
}

ModalConstantEdit.propTypes = {
	...commonModalProps,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}

export default ModalConstantEdit