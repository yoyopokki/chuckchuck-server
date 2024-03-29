import mongoose, { Schema } from 'mongoose'

const dialogScheme = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
})

mongoose.model('Dialog', dialogScheme)

export default mongoose
