import mongoose from 'mongoose'
import { randomUUID as uuid } from 'node:crypto'

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: uuid,
  },
  eventId: {
    type: String,
    required: true,
    index: true,
  },
  key: {
    type: String,
    maxlength: 500,
  },
  value: {
    type: Number,
    required() {
      return this.isNew === true
    },
  },
  details: {
    type: String,
    maxlength: 2000,
  },
  created: {
    type: Date,
    required: true,
    index: true,
    default: Date.now,
  },
  updated: {
    type: Date,
    required: true,
    index: true,
    default: Date.now,
  },
})

export default mongoose.model('Action', schema)
