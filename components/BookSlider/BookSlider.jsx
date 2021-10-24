import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import classes from './BookSlider.module.scss'
import SliderItem from './SliderItem'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

const BOOKS_LIST = [
  {
    title: 'BIG MAGIC',
    author: 'Elizabeth Gilbert',
    rating: 4.5,
    votes: 1945,
    desc: 'Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years.',
    img: '/book_4.jpg'
  },
  {
    title: 'Ten Thousand Skies Above You',
    author: 'Claudia Gray',
    rating: 3.5,
    votes: 200,
    desc: "The hunt for each splinter of Paul's soul sends Marguerite racing through a war-torn San Francisco.",
    img: '/book_3.jpg'
  },
  {
    title: 'A Tale For The Time Being',
    author: ' Cuth Ozeki',
    rating: 5,
    votes: 2547,
    desc: 'In Tokyo, sixteen-year-old Nao has decided there’s only one escape from her aching loneliness and her classmates’ bullying.',
    img: '/book_2.jpg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F.Scott Fitzgerald',
    rating: 4,
    votes: 1987,
    desc: 'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career.',
    img: '/book_1.webp'
  }
]

const BookSlider = () => {
  SwiperCore.use([Navigation])

  return (
    <Swiper
      spaceBetween={2}
      slidesPerView={'auto'}
      centeredSlides
      loop={BOOKS_LIST.length > 3}
      className={classes.swiperContainer}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
    >
      {BOOKS_LIST.map((book, idx) => (
        <SwiperSlide className={classes.slide} key={idx}>
          <SliderItem {...book} idx={idx} />
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev absolute top-24 p-2 cursor-pointer left-2 rounded-full bg-white bg-opacity-40 text-gray-300 w-12 h-12 z-20 hover:bg-opacity-90">
        <ChevronLeftIcon />
      </div>
      <div className="swiper-button-next absolute top-24 p-2 cursor-pointer right-2 rounded-full bg-white bg-opacity-40 text-gray-300 w-12 h-12 z-20 hover:bg-opacity-90">
        <ChevronRightIcon />
      </div>
    </Swiper>
  )
}

export default BookSlider
