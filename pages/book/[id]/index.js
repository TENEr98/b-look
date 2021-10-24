import BookInfo from '@components/BookListing/BookInfo'
import { deleteBook, fetchBook } from '@services/book'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const BookPage = () => {
  const [session, loading] = useSession()
  const [book, setBook] = useState(null)
  const [apiLoading, setApiLoading] = useState(false)

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

  const onBookDelete = async () => {
    setApiLoading(true)

    try {
      await deleteBook({
        id: book._id
      })
    } catch (error) {
      console.error(error)
    } finally {
      router.replace('/profile')
    }
  }

  return (
    !loading &&
    book &&
    !apiLoading && (
      <BookInfo book={book} allowControl onBookDelete={onBookDelete} />
    )
  )
}

export default BookPage
