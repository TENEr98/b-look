import dbConnect from '@utils/dbConnect'
import Book from '@models/book'
import User from '@models/user'

export default async function handler(req, res) {
  const { method } = req

  if (method !== 'POST') {
    res.status(403).send('Not allowed')
    return
  }

  await dbConnect()

  const { id, title, content, image, category, creator } = req.body

  if (title?.length < 1 || content?.length < 1 || category?.length < 1) {
    res.status(400).send('Invalid information provided')
    return
  }

  try {
    if (!id) {
      const currentTime = new Date().getTime()

      const newBook = await Book.create({
        title,
        content,
        image,
        category,
        creator,
        votes: [],
        createdAt: currentTime,
        updatedAt: currentTime
      })

      const creatorModel = await User.findById(creator)

      if (creatorModel) {
        creatorModel.books.push(newBook._id)
        await creatorModel.save()
      }
    } else {
      await Book.findByIdAndUpdate(id, {
        title,
        content,
        image,
        category
      })
    }

    res.status(200).send()
  } catch {
    res.status(500).send()
  }
}
