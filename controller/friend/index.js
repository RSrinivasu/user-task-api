import express from 'express'
const router = express.Router()

import auth from '../auth/authentication'
import update from './update'
import friendList from './list'

router.use(auth)
router.get("/" , friendList)
router.put("/", update)



module.exports = router