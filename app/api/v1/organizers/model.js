const mongoose = require('mongoose');
const { model, Schema } = mongoose

let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Organizer', organizerSchema)