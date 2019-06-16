import axios from 'axios'
const url = '/api/users'
/*eslint-disable */
let token = null
const baseUrl = BACKEND_URL + url
/*eslint-enable */

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }