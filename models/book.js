import { Schema, model, models } from 'mongoose'

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: [
    {
      voter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Schema.Types.Number
      }
    }
  ],
  createdAt: {
    type: Schema.Types.Number
  },
  updatedAt: {
    type: Schema.Types.Number
  }
})

export default models.Book || model('Book', BookSchema)
