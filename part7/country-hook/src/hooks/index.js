import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
  export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
        axios
		.get('https://restcountries.com/v3.1/all')
		.then(response => {
            const countries = response.data
            const res = countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
            if (res.length !== 0) {
                res[0].found = true
                setCountry(res[0])
            } else {
                setCountry({found: false})
            }
            if (name === '') {
                setCountry(null)
            }
		})
    }, [name])
  
    return country
  }
