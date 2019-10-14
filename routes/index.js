import  express  from 'express'
const router = express.Router()

const user = require('../controller/user')


router.use("/",user)


module.exports = router