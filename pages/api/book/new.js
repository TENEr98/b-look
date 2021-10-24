import dbConnect from '@utils/dbConnect'
import Book from '@models/book'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(404).send()
    return
  }

  try {
    await dbConnect()
    const fetchedBooks = await Book.find().limit(50)
    res.send(fetchedBooks.filter((book) => !!book.title && !!book.content))
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}
