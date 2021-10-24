import dbConnect from '@utils/dbConnect'
import Book from '@models/book'

export default async function handler(req, res) {
  const { id } = req.query

  if (id.includes('category')) {
    res.send()
    return
  }

  if (!id || req.method !== 'GET') {
    res.status(404).send()
    return
  }

  try {
    await dbConnect()
    const fetchedBook = await Book.findById(id)
      .populate('creator', 'fullname')
      .exec()

    res.send(fetchedBook)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}
