const router = require('express').Router()
const { login, register } = require('E:/RND/ChatAppUdemy/Chat-App/controllers/authcontroller')
const { rules: registerationRules } = require('../validators/auth/register')
const { rules: loginRules } = require('../validators/auth/login')
const { validate } = require('../validators')

router.post('/login',[loginRules(), validate], login)
router.post('/register',[registerationRules(),validate], register)

module.exports = router