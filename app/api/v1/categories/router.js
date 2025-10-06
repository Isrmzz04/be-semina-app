const express = require('express');
const router = express()
const { index, find, create, update, destroy } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

const roles = ['organizer']
 
router.get('/categories', authenticateUser, authorizeRoles(roles), index)
router.get('/categories/:id', authenticateUser, authorizeRoles(roles), find)
router.post('/categories', authenticateUser, authorizeRoles(roles), create)
router.put('/categories/:id', authenticateUser, authorizeRoles(roles),update)
router.delete('/categories/:id', authenticateUser, authorizeRoles(roles), destroy)

module.exports = router;