const mongoose = require('mongoose');
const { model, Schema } = mongoose

const tickectCategorySchema = Schema({
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true
  },
  expired: {
    type: Date
  }
})

let eventSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minLength: [3, 'Title must be at least 3 characters long'],
      maxLength: [50, 'Title must be at most 50 characters long'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    about: {
      type: String
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
    },
    venueName: {
      type: String,
      required: [true, 'Venue name is required'],
    },
    keyPoint: {
      type: [String]
    },
    statusEvent: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft'
    },
    tickets: {
      type: [tickectCategorySchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Event', eventSchema)
