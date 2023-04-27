import axios from 'axios'
const baseUrl = '/api/blogs'

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  })

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async () => {
  const config = { headers: { Authorization: token }, }
  const response = await apiClient.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await apiClient.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = { headers: { Authorization: token }, }
  const request = apiClient.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = async id => {
  const config = { headers: { Authorization: token }, }
  const response = await apiClient.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, update, remove }