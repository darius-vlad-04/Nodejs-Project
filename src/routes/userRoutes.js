import express from 'express'
import userController from "../controllers/userController.js";
import authorization from "../middlewares/authMiddleware.js";
import adminCheck from "../middlewares/adminMiddleware.js";

const userRouter = express.Router();

//userRouter.get('/saveToFile', userController.saveAllUsersToFile)
userRouter.get('/users', authorization, adminCheck, userController.getAllUsers)
//userRouter.post("/users", userController.insertUser) - Now implemented in Signup
userRouter.get("/users/:id", userController.findUserById)
userRouter.delete("/users/:id", userController.deleteUserById)
userRouter.put("/users/:id", userController.updateUser)
//userRouter.get("/message", authorization, userController.testSendMessage) - For Testing

export default userRouter