import dbConnect from '@utils/dbConnect'
import Book from '@models/book'

export default async function handler(req, res) {
  const { method } = req

  if (method !== 'POST') {
    res.status(403).send('Not allowed')
    return
  }

  await dbConnect()

  const { id } = req.body

  if (id?.length < 1) {
    res.status(400).send('Invalid information provided')
    return
  }

  try {
    await Book.findByIdAndDelete(id)

    res.status(200).send()
  } catch {
    res.status(500).send()
  }
}
