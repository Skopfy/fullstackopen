import { useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])


    // ...

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources(resources.concat([response.data]))
    }

    const service = {
        create,
        getAll
    }

    return [
        resources, service
    ]
}