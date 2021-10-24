import BookListing from '@components/BookListing/BookListing'
import BookSlider from '@components/BookSlider/BookSlider'

export default function Home() {
  return (
    <div>
      <BookSlider />
      <BookListing />
    </div>
  )
}
