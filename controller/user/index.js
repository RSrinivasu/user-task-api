import express from 'express'
const router = express.Router()

import auth from '../auth/authentication'
import login from './login'
import search from './search'
const register = require("./register")

router.post("/login", login)
router.post("/", register)

router.use(auth)
router.get("/search", search )



module.exports = router