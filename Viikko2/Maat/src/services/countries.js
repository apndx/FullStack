import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const create = (newObject) => {
    return axios.post(baseUrl, newObject)
  }

  const del = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    const request = axios.get(baseUrl)  
    return request.then(response => response.data)
  }

  export default { getAll, create, del }