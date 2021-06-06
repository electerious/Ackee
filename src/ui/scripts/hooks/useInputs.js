import { useState, useCallback } from 'react'

export default (initialInputs) => {
	const [ inputs, setInputs ] = useState(initialInputs)

	const onChange = useCallback((key) => {
		return (e) => {
			setInputs((inputs) => ({
				...inputs,
				[key]: e.target.value,
			}))
		}
	}, [ setInputs ])

	return [ inputs, onChange ]
}