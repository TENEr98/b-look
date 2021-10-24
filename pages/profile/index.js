import Profile from '@components/User/Profile'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchUserBooks } from '@services/book'

const ProfilePage = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  const [apiLoading, setApiLoading] = useState(true)
  const [userBooks, setUserBooks] = useState([])

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/auth/signin')
    } else if (session) {
      fetchUserBooks(session.user.id).then((fetchedBooks) => {
        setUserBooks(fetchedBooks)
        setApiLoading(false)
      })
    }
  }, [loading, session, setApiLoading, setUserBooks])

  return (
    !loading &&
    session &&
    !apiLoading && <Profile owner user={session.user} userBooks={userBooks} />
  )
}

export default ProfilePage
