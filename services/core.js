const axios = require('axios')

const coreInstance = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
module.exports = { coreInstance }
