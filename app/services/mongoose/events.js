const Events = require('../../api/v1/events/model')
const { checkingImage } = require('./images')
const { checkingCategories } = require('./categories')
const { checkingTalents } = require('./talents')
const { NotFoundError, BadRequestError } = require('../../errors')

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query

  let condition = { organizer: req.user.organizer }

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } }
  }

  if (category) {
    condition = { ...condition, category }
  }

  if (talent) {
    condition = { ...condition, talent }
  }

  const result = await Events.find(condition)
    .populate({
      path: 'image',
      select: '_id name'
    })
    .populate({
      path: 'category',
      select: '_id name'
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: {
        path: 'image',
        select: '_id name'
      }
    })

  return result

}

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent
  } = req.body

  await checkingImage(image)
  await checkingCategories(category)
  await checkingTalents(talent)

  const check = await Events.findOne({ title, organizer: req.user.organizer })

  if (check) {
    throw new BadRequestError(`Event ${title} already exists`)
  }

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer
  })

  return result

}

const getOneEvents = async (req) => {
  const { id } = req.params

  const result = await Events.findOne({ _id: id, organizer: req.user.organizer })
    .populate({
      path: 'image',
      select: '_id name'
    })
    .populate({
      path: 'category',
      select: '_id name'
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: {
        path: 'image',
        select: '_id name'
      }
    })

  if (!result) {
    throw new NotFoundError(`Event with id ${id} not found`)
  }

  return result

}

const updateEvents = async (req) => {
  const { id } = req.params
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent
  } = req.body

  await checkingImage(image)
  await checkingCategories(category)
  await checkingTalents(talent)

  const checkEvent = await Events.findOne({ _id: id, organizer: req.user.organizer })

  if (!checkEvent) {
    throw new NotFoundError(`Event with id ${id} not found`)
  }

  const check = await Events.findOne({ title, organizer: req.user.organizer, _id: { $ne: id } })

  if (check) {
    throw new BadRequestError(`Event ${title} already exists`)
  }

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer
    },
    { new: true, runValidators: true }
  )

  return result
}

const deleteEvents = async (req) => {
  const { id } = req.params

  const result = await Events.findOneAndDelete({ _id: id, organizer: req.user.organizer })

  if (!result) {
    throw new NotFoundError(`Event with id ${id} not found`)
  }

  return result
}

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
  checkingTalents
}