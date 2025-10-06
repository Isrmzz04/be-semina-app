const Users = require('../../api/v1/users/model')
const { BadRequestError, UnauthorizedError } = require('../../errors')
const { createToken, createJWT } = require('../../utils')

const signin = async (req) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await Users.findOne({ email })

  if (!user) {
    throw new UnauthorizedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials')
  }

  const token = createJWT({ payload: createToken(user) })

  return token
}

module.exports = {
  signin
}