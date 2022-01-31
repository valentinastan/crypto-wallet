import axios from 'axios'

let SERVER = 'http://localhost:2020'


export async function get(url, params) {
  let response = await axios.get(`${SERVER}/${url}`, {
    params
  })

  return response
}

export async function getExternalAPI(url, headers) {
  let response = await axios.get(`${url}`, {headers})

  return response
}


export async function getExternal(url) {
  let response = await axios.get(`${url}`)

  return response
}

const axiosFormActionDefaults = ({ url, method, params = {}, headers = {} }) => ({
  method,
  url,
  data: params,
  headers,
})

export async function post(url, params) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'POST',
    params
  }))

  return response
}

export async function del(url) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'DELETE',
  }))

  return response
}

export async function put(url, params) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'PUT',
    params
  }))

  return response
}