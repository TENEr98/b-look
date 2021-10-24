import dbConnect from '@utils/dbConnect'
import Book from '@models/book'

export default async function handler(req, res) {
  const { id } = req.query

  if (!id || req.method !== 'GET') {
    res.status(404).send()
    return
  }

  try {
    await dbConnect()
    const fetchedBooks = await Book.find({
      creator: id
    })

    res.send(fetchedBooks.filter((book) => !!book.title && !!book.content))
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}
