import crypto from 'crypto'

const generateSalt = (rounds = 12) => {
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15,Must be less that 15`)
  }
  if (typeof rounds !== 'number') {
    throw new Error('rounds param must be a number')
  }
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString('hex')
    .slice(0, rounds)
}

const hasher = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    password: value
  }
}

const hash = (password, salt) => {
  if (password == null || salt == null) {
    throw new Error('Must Provide Password and salt values')
  }
  if (typeof password !== 'string' || typeof salt !== 'string') {
    throw new Error(
      'password must be a string and salt must either be a salt string or a number of rounds'
    )
  }
  return hasher(password, salt)
}

const compare = (password, hash) => {
  if (!password || !hash) {
    throw new Error('password and hash is required to compare')
  }
  if (typeof password !== 'string' || typeof hash !== 'object') {
    throw new Error('password must be a String and hash must be an Object')
  }
  let passwordData = hasher(password, hash.salt)
  if (passwordData.hashedpassword === hash.hashedpassword) {
    return true
  }
  return false
}

export { generateSalt, hash, compare }
