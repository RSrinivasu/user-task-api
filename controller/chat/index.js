import express from 'express'
const router = express.Router()

import auth from '../auth/authentication'
import history from './list'

router.use(auth)
router.get("/" , history)



module.exports = router