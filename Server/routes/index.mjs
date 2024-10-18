import {Router} from "express"
//custom index page to export all routers
import userRouter from './userRoutes.mjs'

const router = Router()

router.use(userRouter)

export default router