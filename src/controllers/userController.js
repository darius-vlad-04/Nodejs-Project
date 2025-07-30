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
                await userService.deleteUserById(req.params.id)
                res.status(200).json({message: "User has been deleted!"})

            } catch (e) {
                res.status(400).json({error: e.message})
            }
        },

        updateUser: async (req, res) => {
            try {
                console.log(req.body)
                let response = await userService.updateUser(req.params.id, req.body)
                res.status(200).json({message: "User has been updated!"})
            } catch (e) {
                res.status(400).json({error: e.message})
            }
        },

        uploadPhoto: async (req, res) => {
            try {
                await userService.uploadProfilePic(req.userId, req.file.path);
                res.status(200).json({message: "Profile picture has been uploaded"})
            } catch (e) {
                res.status(400).json({error: "Error uploading picture"})
            }
        }

    }

export default userController