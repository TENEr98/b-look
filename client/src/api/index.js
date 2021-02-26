import axios from 'axios'

const instance = axios.create({
  baseUrl: 'localhost:5000'
})

export const BlogAPI = {
  save(data, userId) {
    return instance
      .post('/blog', data)
      .then((response) => response)
      .catch((err) => err.response)
  }
}
