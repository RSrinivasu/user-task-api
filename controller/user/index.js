import express from 'express'
const router = express.Router()

import login from './login'
// const login = require("./login")
const register = require("./register")

router.post("/login", login)
router.post("/", register)


module.exports = router