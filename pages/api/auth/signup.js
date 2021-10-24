import dbConnect from '@utils/dbConnect'
import User from '@models/user'
import { generateSalt, hash } from '@utils/password'

export default async function handler(req, res) {
  const { method } = req

  if (method !== 'POST') {
    res.status(403).send('Not allowed')
    return
  }

  await dbConnect()

  const { email, fullname, password, username } = req.body

  if (
    email?.length < 3 ||
    fullname?.length < 3 ||
    password?.length < 3 ||
    username?.length < 3
  ) {
    res.status(400).send('Invalid information provided')
    return
  }

  const isUserExists = await User.exists({
    $or: [
      {
        username
      },
      {
        email
      }
    ]
  })

  if (isUserExists) {
    res.status(400).send('User with this email/username already exists')
    return
  }

  const salt = generateSalt()
  const hashedPassword = hash(password, salt)

  await User.create({
    email,
    password: hashedPassword.password,
    salt: hashedPassword.salt,
    username,
    fullname
  })

  res.status(200).send('Success')
}
