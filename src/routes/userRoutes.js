import express from 'express'
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/verifyTokenMiddleware.js";
import adminCheck from "../middlewares/adminMiddleware.js";
import authorization from "../middlewares/authorizationMiddleware.js";

const userRouter = express.Router();

//userRouter.get("/message", authorization, userController.testSendMessage) - For Testing
//userRouter.post("/users", userController.insertUser) - Now implemented in Signup
//userRouter.get('/saveToFile', userController.saveAllUsersToFile)
userRouter.get('/users', tokenValidation, authorization(2), userController.getAllUsers)
userRouter.get("/users/:id", tokenValidation, authorization(2), userController.findUserById)
userRouter.delete("/users/:id", tokenValidation, authorization(1), userController.deleteUserById)
userRouter.put("/users/:id", tokenValidation, authorization(1), userController.updateUser)


export default userRouter