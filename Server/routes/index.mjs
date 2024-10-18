import {Router} from "express"
//custom index page to export all routers
import userRouter from './usersRouter.mjs'

const router = Router()

router.use(userRouter)

export default router