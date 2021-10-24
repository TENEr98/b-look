import Image from 'next/image'
import Rating from 'react-rating'
import { StarIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const BookItem = ({ book = {} }) => {
  return (
    <div className="pt-6 relative">
      <div className="absolute left-3 top-0 z-20">
        <div className="w-32 aspect-h-3 aspect-w-2">
          <img src={book.image} alt="Book" />
        </div>
      </div>
      <div className="w-full h-56 aspect-h-3 aspect-w-2 bg-white rounded shadown-sm p-2">
        <div className="pl-40 py-2">
          <div className="space-y-2 flex flex-col">
            <div className="text-base font-semibold">{book.title}</div>
            <div className="space-x-2 flex items-center">
              <Rating
                initialRating={2.5}
                readonly
                style={{
                  fontSize: 0
                }}
                emptySymbol={
                  <StarIcon className="h-5 w-5 text-gray-600 opacity-40" />
                }
                fullSymbol={<StarIcon className="h-5 w-5 text-yellow-400" />}
                fractions={2}
              />
              <span className="text-sm leading-none">
                {book.votes?.length} votes
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {book.content.slice(0, 120)}
            </p>
            <div className="w-full p-4 flex items-center justify-end">
              <Link href={`/book/${book._id}`}>
                <a className="bg-blue-500 w-full h-8 text-center flex items-center justify-center text-sm text-white font-normal rounded-full shadow-sm uppercase mt-auto hover:shadow-md cursor-pointer">
                  view
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookItem
