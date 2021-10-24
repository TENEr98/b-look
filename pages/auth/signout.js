import { signOut } from 'next-auth/client'
import { useEffect } from 'react'

const SignOutPage = () => {
  useEffect(() => {
    signOut({
      callbackUrl: '/'
    })
  }, [])

  return <div>Loading...</div>
}

export default SignOutPage
