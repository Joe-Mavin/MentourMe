import express from "express"

//import your controllers
import userController from '../controllers/userController.mjs'

const router = express.Router()

//decalre your routes
router.route('/v1/api/register')
      .post(userController.registerUser)
      .post()


export default router    