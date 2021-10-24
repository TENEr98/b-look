import BookEditor from '@components/BookListing/BookEditor'
import { fetchBook } from '@services/book'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditBookPage = () => {
  const [session, loading] = useSession()
  const [book, setBook] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/auth/signin')
    }
  }, [loading])

  useEffect(() => {
    if (!router.query.id || loading || !session || book) {
      return
    }

    console.log('here', router.query.id)

    fetchBook(router.query.id)
      .then((fetchedBook) => {
        console.log(fetchedBook)
        if (!fetchedBook) {
          router.replace('/')
        } else {
          setBook({
            ...fetchedBook
          })
        }
      })
      .catch(() => {
        router.replace('/')
        return
      })
  }, [router.query.id, loading, session, book])

  console.log(router.query)
  return !loading && book && <BookEditor updatingBook={book} />
}

export default EditBookPage
