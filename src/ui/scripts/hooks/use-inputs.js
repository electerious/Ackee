import { useCallback, useState } from 'react'

export default (initialInputs) => {
  const [inputs, setInputs] = useState(initialInputs)

  const onChange = useCallback(
    (key) => {
      return (event) => {
        setInputs((inputs) => ({
          ...inputs,
          [key]: event.target.value,
        }))
      }
    },
    [setInputs],
  )

  return [inputs, onChange]
}
