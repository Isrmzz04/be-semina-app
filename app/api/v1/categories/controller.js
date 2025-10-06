const { StatusCodes } = require('http-status-codes')

const {
  getAllCategories,
  getOneCategoies,
  createCategories,
  updateCategories,
  deleteCategories
} = require('../../../services/mongoose/categories')

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req)
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (err) {
    next(err)
  }
}

const find = async (req, res, next) => {
  try {
    const result = await getOneCategoies(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req)
    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {

    const result = await updateCategories(req)

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req)
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index,
  find,
  create,
  update,
  destroy
}