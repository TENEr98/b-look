import { fetchNewBooks, fetchBooksByCategory } from '@services/book'
import { useEffect, useState } from 'react'
import BookItem from './BookItem'

const BookListing = ({ category = '' }) => {
  const [booksList, setBooksList] = useState([])

  useEffect(() => {
    ;(category.length > 0 ? fetchBooksByCategory : fetchNewBooks)().then(
      (fetchedNewBooks) => {
        setBooksList([...fetchedNewBooks])
      }
    )
  }, [setBooksList])

  return (
    <div className="px-8 mt-8">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-700">
          {category.length > 0
            ? `Books with category ${category}`
            : 'New books'}
        </h3>
      </div>

      {booksList.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-8 relative lg:grid-cols-2 xl:grid-cols-3">
          {booksList.map((book) => (
            <BookItem book={book} />
          ))}
        </div>
      ) : (
        <h1 className="text-center mt-8 text-gray-500">No books to show</h1>
      )}
    </div>
  )
}

export default BookListing
