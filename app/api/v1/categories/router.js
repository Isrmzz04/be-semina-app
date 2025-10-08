const express = require('express');
const router = express()
const { index, find, create, update, destroy } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

const roles = authorizeRoles('organizer')
 
router.get('/categories', authenticateUser, roles, index)
router.get('/categories/:id', authenticateUser, roles, find)
router.post('/categories', authenticateUser, roles, create)
router.put('/categories/:id', authenticateUser, roles,update)
router.delete('/categories/:id', authenticateUser, roles, destroy)

module.exports = router;