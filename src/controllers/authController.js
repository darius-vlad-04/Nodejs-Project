import authService from "../services/authService.js";

const authController =
    {
        signup: async (req, res) => {
            try {
                console.log(req)
                await authService.signup(req.body)
                res.status(200).json({message: "Successfully registered!"})
            } catch (e) {
                res.status(401).json({error: e.message})
            }
        }
        ,
        login: async (req, res) => {
            try {
                let token = await authService.login(req.body.email, req.body.password)
                res.cookie("access_token", token, {
                    httpOnly: true
                }).send("Successful Login")
            } catch (e) {
                res.status(401).json({error: e.message})
            }
        },

        logout: async (req, res) => {
            return res.clearCookie("access_token").status(200).json({message: "Successfully logged out!"})
        }

    }


export default authController