import { CalendarIcon, StarIcon, TranslateIcon } from '@heroicons/react/solid'
import { classNames } from '@utils/tailwinds'
import Link from 'next/link'

const BooksList = ({ books = [], classes = '', ...restProps }) => {
  return (
    <div className={classNames('w-full flex flex-col', classes)} {...restProps}>
      <h2 className="text-gray-600 text-lg border-b border-gray-200 pb-3 font-medium">
        Books
      </h2>
      <div className="bg-white overflow-hidden sm:rounded-md">
        {books.length < 1 ? (
          <div className="max-w-7xl mx-auto text-center mt-6">
            <h2 className="tracking-tight text-gray-400 text-lg">
              Your books list is empty
            </h2>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {books.map((book) => (
              <li key={book._id}>
                <Link href={`/book/${book._id}`}>
                  <a className="block hover:bg-gray-50">
                    <div className="py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-800 truncate">
                          {book.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {book.category}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <TranslateIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            {
                              book.content
                                .split(' ')
                                .filter((word) => word.length > 0).length
                            }
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <StarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            {book.votes.length}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Created on{' '}
                            <time
                              dateTime={new Date(book.createdAt).toDateString()}
                            >
                              {new Date(book.createdAt).toDateString()}
                            </time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/book/create"
              className="w-full flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50"
            >
              Start a new book
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooksList
