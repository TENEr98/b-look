import { StarIcon } from '@heroicons/react/solid'
import { classNames } from '@utils/tailwinds'
import Link from 'next/link'
import React from 'react'
import Rating from 'react-rating'

const BookInfo = ({
  book = {},
  onBookDelete = () => {},
  allowControl = false
}) => {
  return (
    <div className="flex flex-col p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-nowrap w-full">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
          <div className="px-4 py-5 sm:px-6 flex flex-nowrap">
            <div
              className={classNames(
                'w-32 h-40 relative flex items-center justify-center overflow-hidden',
                !book.image && 'bg-gray-600'
              )}
            >
              {book.image ? (
                <img className="w-full h-auto top-0 left-0" src={book.image} />
              ) : (
                <p className="text-white">No image</p>
              )}
            </div>
            <div className="ml-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {book.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                by {book.creator.fullname}
              </p>
            </div>
            {allowControl && (
              <span className="ml-auto relative z-0 inline-flex shadow-sm rounded-md h-8">
                <Link href={`/book/${book._id}/edit`}>
                  <a className="cursor-pointer relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Edit
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={onBookDelete}
                  className="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Delete
                </button>
              </span>
            )}
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Create at</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(Number(book.createdAt)).toDateString()}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Updated at
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(Number(book.updatedAt)).toDateString()}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Rating</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Rating
                    initialRating={2.5}
                    readonly
                    style={{
                      fontSize: 0
                    }}
                    emptySymbol={
                      <StarIcon className="h-5 w-5 text-gray-600 opacity-40" />
                    }
                    fullSymbol={
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                    }
                    fractions={2}
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {book.category}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Content</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {book.content}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookInfo
