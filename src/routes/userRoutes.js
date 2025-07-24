import express from 'express'
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/saveToFile', userController.saveAllUsersToFile)
userRouter.get('/getAll', userController.getAllUsers)
userRouter.post("/insert", userController.insertUser)
userRouter.get("/findById", userController.findUserById)
userRouter.delete("/deleteById", userController.deleteUserById)
userRouter.patch("/updateUser" , userController.updateUser)

export default userRouter