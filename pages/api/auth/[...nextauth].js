import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '@utils/dbConnect'
import User from '@models/user'
import { hash, generateSalt } from '@utils/password'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      if (
        credentials.username?.length < 3 &&
        credentials.password?.length < 3
      ) {
        return null
      }

      await dbConnect()

      const foundUser = await User.findOne({
        username: credentials.username
      })

      if (!foundUser) {
        return null
      }

      const hashedPassword = hash(
        credentials.password,
        foundUser.salt || generateSalt()
      )

      if (foundUser.password !== hashedPassword.password) {
        return null
      }

      const {
        books,
        likes,
        email,
        username,
        fullname,
        id,
        followers,
        follows
      } = foundUser

      return {
        id,
        books,
        likes,
        email,
        username,
        fullname,
        followers,
        follows
      }
    }
  })
]

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token = {
        ...token,
        user
      }
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken

    session.user = {
      ...session.user,
      ...token.user
    }
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  }
}

export default (req, res) => NextAuth(req, res, options)
