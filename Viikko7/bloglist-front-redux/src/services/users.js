import axios from 'axios'
const baseUrl = '/api/users'
/*eslint-disable */
let token = null
/*eslint-enable */

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }