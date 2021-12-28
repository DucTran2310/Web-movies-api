import axios from 'axios'
import queryString from 'queryString'

import apiConfig from './apiConfig'

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  // `headers` are custom headers to be sent
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
})

axiosClient.interceptors.request.use(async (config) => config)

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data
  }

  return response
}, (error) => {
  throw error
})

export default axiosClient
