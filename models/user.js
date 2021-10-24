import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  fullname: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    minlength: 3
  },
  salt: {
    type: String,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

export default models.User || model('User', UserSchema)
