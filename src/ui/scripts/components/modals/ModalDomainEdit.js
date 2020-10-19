import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
// import { useHotkeys } from 'react-hotkeys-hook'

import Input from '../Input'
import Textarea from '../Textarea'
import Label from '../Label'
import Spinner from '../Spinner'
import Spacer from '../Spacer'

import customTracker from '../../../../utils/customTracker'
import shortId from '../../utils/shortId'

const ModalDomainEdit = (props) => {

	// Currently not possible:
	// https://github.com/JohannesKlauss/react-hotkeys-hook/issues/276
	// useHotkeys('esc', props.closeModal, {
	// 	filter: () => props.current === true
	// })

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

	const titleId = shortId()
	const idId = shortId()
	const embedId = shortId()

	const trackerUrl = customTracker.url || '/tracker.js'
	const srcUrl = (new URL(trackerUrl, location.href)).href
	const serverUrl = location.origin

	return (
		h('form', { className: 'card', onSubmit: updateDomain },
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
				}),

				h(Label, { htmlFor: idId }, 'Domain id'),

				h(Input, {
					type: 'text',
					id: idId,
					readOnly: true,
					placeholder: 'Domain id',
					value: props.id,
					onFocus: copyInput
				}),

				h(Label, { htmlFor: embedId }, 'Embed code'),

				h(Textarea, {
					type: 'text',
					id: embedId,
					readOnly: true,
					rows: 4,
					value: `<script async src="${ srcUrl }" data-ackee-server="${ serverUrl }" data-ackee-domain-id="${ props.id }"></script>`,
					onFocus: copyInput
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
					type: 'button',
					className: 'card__button link color-destructive',
					onClick: deleteDomain
				}, 'Delete'),

				h('div', {
					className: 'card__separator '
				}),

				h('button', {
					className: 'card__button card__button--primary link color-white',
					disabled: props.fetching === true
				}, props.fetching === true ? h(Spinner) : 'Rename')

			)
		)
	)

}

ModalDomainEdit.propTypes = {
	current: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	fetching: PropTypes.bool.isRequired,
	updateDomain: PropTypes.func.isRequired,
	deleteDomain: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
}

export default ModalDomainEdit