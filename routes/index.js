import  express  from 'express'
const router = express.Router()

const user = require('../controller/user')
import friend from '../controller/friend'
import chat from '../controller/chat'

router.use("/",user)
router.use("/friend", friend)
router.use("/chat", chat)
module.exports = router