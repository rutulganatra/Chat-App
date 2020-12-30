const router = require('express').Router()
const { update } = require('E:/RND/ChatAppUdemy/Chat-App/controllers/userController')
const { auth } = require('../middleware/auth')
const { rules: updateRules } = require('../validators/user/update')
const { validate } = require('../validators')
const { userFile } = require('../middleware/fileUpload')

router.post('/update', [auth, userFile, updateRules, validate], update)

module.exports = router