import axios from 'axios'
const baseUrl = '/api/blogs'

let token =  null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getUsers = async () => {
  const request = await axios.get('/api/users')
  return request.data
}

const create = async (newBlog) => {
  const config = {
    headers : { Authorization : token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async (id, newBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, newBlog)
  return request.data
}
const comment = async (id, newComment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  return request.data
}

const remove = async(id) => {
  const config = {
    headers : { Authorization : token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}
export default { create, getAll, getUsers, update, comment, remove, setToken }