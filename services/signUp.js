import { coreInstance } from './core'

const signUpUser = async (payload) => {
  const { data } = await coreInstance.post('/auth/signup', payload)
  return data
}

export { signUpUser }
