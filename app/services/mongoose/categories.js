const Categories = require('../../api/v1/categories/model')
const {
  NotFoundError,
  BadRequestError
} = require('../../errors')

const getAllCategories = async (req) => {
  const result = await Categories.find({
    organizer: req.user.organizer
  })

  return result
}

const getOneCategoies = async (req) => {
  const { id } = req.params

  const result = await Categories.findOne({ _id: id, organizer: req.user.organizer })
  if (!result) throw new NotFoundError(`Category with id ${id} not found`)

  return result

}

const createCategories = async (req) => {
  const { name } = req.body

  const check = await Categories.findOne({ name, organizer: req.user.organizer })

  if (check) {
    throw new BadRequestError(`Category ${name} already exists`)
  }

  const result = await Categories.create({ name, organizer: req.user.organizer })

  return result
}

const updateCategories = async (req) => {
  const { id } = req.params
  const { name } = req.body

  const checkCategoryId = await Categories.findOne({ _id: id, organizer: req.user.organizer })

  if (!checkCategoryId) {
    throw new NotFoundError(`Category with id ${id} not found`)
  }

  const checkDuplicateCategory = await Categories.findOne({
    name,
    _id: { $ne: id }
  })

  if (checkDuplicateCategory) {
    throw new BadRequestError(`Category ${name} already exists`)
  }

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  )

  return result

}

const deleteCategories = async (req) => {
  const { id } = req.params
  const result = await Categories.findOneAndDelete({ _id: id, organizer: req.user.organizer })

  if (!result) throw new NotFoundError(`Category with id ${id} not found`)

  return result

}

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id})

  if (!result) throw new NotFoundError(`Category with id ${id} not found`)

  return result
}

module.exports = {
  getAllCategories,
  getOneCategoies,
  createCategories,
  updateCategories,
  deleteCategories,
  checkingCategories
}