import express from "express";
// import router from '../src/routes/index.mjs'
import userRouter from '../src/routes/userRoutes.mjs'
const app = express();
app.use(express.json());

//use our router
app.use(router)

//mount the users router
app.use('/api/v1/users', userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
