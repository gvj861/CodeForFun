const express = require('express')
const router = express.Router()
const auth = require('../controllers/userController')
router.post('/signup', auth.signup)


module.exports = router