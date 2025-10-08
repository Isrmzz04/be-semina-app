const express = require('express');
const router = express()
const { index, find, create, update, destroy } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

const roles = ['organizer']

router.get('/events', authenticateUser, authorizeRoles(roles), index)
router.get('/events/:id', authenticateUser, authorizeRoles(roles), find)
router.post('/events', authenticateUser, authorizeRoles(roles), create)
router.put('/events/:id', authenticateUser, authorizeRoles(roles), update)
router.delete('/events/:id', authenticateUser, authorizeRoles(roles), destroy)

module.exports = router;