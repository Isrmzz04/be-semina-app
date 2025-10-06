const express = require('express');
const router = express()
const { create } = require('./controller')
const upload = require('../../../middlewares/multer')

// router.get('/categories', index)
// router.get('/categories/:id', find)
router.post('/images', upload.single('avatar'), create)
// router.put('/categories/:id', update)
// router.delete('/categories/:id', destroy)

module.exports = router;