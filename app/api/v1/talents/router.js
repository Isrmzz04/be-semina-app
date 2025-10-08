const express = require('express');
const router = express()
const { index, find, create, update, destroy } = require('./controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')

const roles = authorizeRoles('organizer')

router.get('/talents', authenticateUser, roles, index)
router.get('/talents/:id', authenticateUser, roles, find)
router.post('/talents', authenticateUser, roles, create)
router.put('/talents/:id', authenticateUser, roles, update)
router.delete('/talents/:id', authenticateUser, roles, destroy)

module.exports = router;