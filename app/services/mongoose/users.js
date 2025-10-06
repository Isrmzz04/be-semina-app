const Users = require('../../api/v1/users/model')
const Organizers = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../errors')

const createOrganizer = async (req) => {
  const { organizer, name, email, password, confirmPassword, role } = req.body

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match')
  }

  const newOrganizer = await Organizers.create({ organizer })

  const result = await Users.create({ name, email, password, organizer: newOrganizer._id, role })

  delete result._doc.password

  return result

}

const createUsers = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body

  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match')
  }

  const result = await Users.create({ name, email, password, role, organizer: req.user.organizer })

  return result

}

module.exports = {
  createOrganizer,
  createUsers
}