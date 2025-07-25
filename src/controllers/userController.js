import userService from "../services/userService.js";
import writeJsonToFile from "../utils/utils.js";

const userController =
    {
        saveAllUsersToFile: async (req, res) => {
            let [allUsers, fields] = await userService.getAllUsers()
            writeJsonToFile(allUsers)
            res.send("Data has been written!")
        },
        getAllUsers: async (req, res) => {
            let [allUsers, fields] = await userService.getAllUsers()
            res.send(allUsers)
        },
        insertUser: async (req, res) => {
            let user =  await  userService.insertUser(req.body.name, req.body.email, req.body.password)
            res.send(user)
        }
        ,
        findUserById: async (req, res) => {
            try {
                let user = await userService.findUserById(req.params.id)
                res.send(user)
            } catch (e) {
                res.status(400).send(e.message)
            }
        }
        ,

        deleteUserById: async (req, res) => {
            try {
                console.log(req.body)
                let response = await userService.deleteUserById(req.params.id)
                res.send(response)

            } catch (e) {
                res.status(400).send(e.message)
            }
        },

        updateUser: async (req, res) => {
            try {
                console.log(req.body)
                let response = await userService.updateUser(req.params.id, req.body)
                res.send(response)
            } catch (e) {
                res.status(400).send(e.message)
            }
        },

        testSendMessage: async (req, res) => {
            res.send(`I am sending from this id : ${req.userId}`)
        }

    }

export default userController