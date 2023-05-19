import axios from 'axios'
const baseUrl = '/api/users'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const get = async (id) => {
  const config = { headers: { Authorization: token } }
  const url = baseUrl + `/${id}`
  const response = await axios.get(url, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, get, setToken }
