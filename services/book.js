import { coreInstance } from './core'

const saveBook = async (payload) => {
  const { data } = await coreInstance.post('/book/save', payload)
  return data
}

const deleteBook = async (payload) => {
  const { data } = await coreInstance.post('/book/save', payload)
  return data
}

const fetchBook = async (id) => {
  const { data } = await coreInstance.get(`/book/${id}`)
  return data
}

const fetchUserBooks = async (id) => {
  const { data } = await coreInstance.get(`/book/user/${id}`)
  return data
}

const fetchNewBooks = async () => {
  const { data } = await coreInstance.get('/book/new')
  return data
}

const fetchBooksByCategory = async (category = '') => {
  const { data } = await coreInstance.get(`/book/category/${category}`)
  return data
}

export {
  saveBook,
  deleteBook,
  fetchBook,
  fetchUserBooks,
  fetchNewBooks,
  fetchBooksByCategory
}
