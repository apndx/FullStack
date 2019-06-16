import axios from 'axios'
const url = '/api/login'
/*eslint-disable */
const baseUrl = BACKEND_URL + url
/*eslint-enable */

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }