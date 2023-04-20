import { useState } from 'react'

export const useField = (type) => {  const [value, setValue] = useState('')

  const onChange = (value) => {
    setValue(value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}