import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Rating from 'react-rating'

const SliderItem = (props) => {
  const {
    title = '',
    author = '',
    rating = 0,
    votes = 0,
    desc = '',
    img = '/book_1.webp',
    idx = 0,
    ...restProps
  } = props

  return (
    <div
      className={`flex flex-col h-60 px-8 py-4 text-white pl-60 relative bg-slider-${
        (idx + 1) % 5
      }`}
      {...restProps}
    >
      <div className="space-y-2">
        <div className="text-base font-semibold">{title}</div>
        <div className="text-sm font-light leading-none">by {author}</div>
        <div className="space-x-2 flex items-center">
          <Rating
            initialRating={rating}
            readonly
            style={{
              fontSize: 0
            }}
            emptySymbol={<StarIcon className="h-5 w-5 text-white opacity-40" />}
            fullSymbol={<StarIcon className="h-5 w-5 text-white" />}
            fractions={2}
          />
          <span className="text-sm leading-none">{votes} votes</span>
        </div>
      </div>
      <div className="flex-1 text-sm leading-tight mt-3">{desc}</div>
      <div className="capitalize mt-auto text-center p-1.5 shadow-sm bg-white rounded-full text-blue-400 text-opacity-80 cursor-pointer hover:text-blue-600 font-semibold transition-colors ease-in-out duration-150 w-40">
        See The Book
      </div>
      <div className="absolute top-4 left-6 shadow-xl transform hover:scale-105 transition-transform ease-out-expo duration-700 cursor-pointer">
        <div className="w-48 aspect-w-2 aspect-h-3">
          <Image src={img} layout="fill" />
        </div>
      </div>
    </div>
  )
}

export default SliderItem
