import BookListing from '@components/BookListing/BookListing'
import BookSlider from '@components/BookSlider/BookSlider'
import { useRouter } from 'next/router'

export default function CategoryBooks() {
  const router = useRouter()

  console.log(router.query)

  return router.query.category ? (
    <div>
      <BookSlider />
      <BookListing category={router.query.category} />
    </div>
  ) : (
    <div>Loading</div>
  )
}
