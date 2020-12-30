const router = require('express').Router()
const { index, create, messages, deleteChat } = require('E:/RND/ChatAppUdemy/Chat-App/controllers/chatController')
const { auth } = require('../middleware/auth')

router.get('/', [auth], index)
router.post('/create', [auth], create)
router.get('/messages',[auth],messages)
router.delete('/:id',[auth],deleteChat)

module.exports = router