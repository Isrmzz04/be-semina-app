const express = require('express');
const router = express()
const { createCMSOrganizer, createCMSUsers } = require('./controller')
const { authenticateUser } = require('../../../middlewares/auth')

router.post('/organizers', createCMSOrganizer)
router.post('/users', authenticateUser, createCMSUsers)

module.exports = router;