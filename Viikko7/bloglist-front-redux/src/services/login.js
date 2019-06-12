import axios from 'axios'
//const baseUrl = '/api/login'
const baseUrl = {BACKEND_URL}

//const login = async (credentials) => {  //old
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }