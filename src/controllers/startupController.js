import startupService from "../services/startupService.js";


const startupController =
    {
        getAllStartups: async (req, res) => {
            try {
                let [allStartups, fields] = await startupService.getAllStartups()
                return res.status(200).send(allStartups)
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        },

        createStartup: async (req, res) => {
            try {
                req.body.founder_id = req.userId
                await startupService.createStartup(req.body)
                res.status(200).json({message: "Successfully created startup!"})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        }
        ,

        getStartupById: async (req, res) => {
            try {
                let startup = await startupService.findStartupById(req.params.id)
                return res.send(startup)
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        },

        deleteStartupById: async (req, res) => {
            let startup
            try {
                startup = await startupService.findStartupById(req.params.id)

            } catch (e) {
                return res.status(400).json({error: e.message})
            }

            if (startup.founder_id !== req.userId) {
                return res.status(403).json({error: "Unauthorized"})
            }
            try {
                let response = await startupService.deleteStartupById(req.params.id)
                return res.status(200).json({message: "Startup has been deleted"})
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        },

        updateStartupById: async (req, res) => {
            try {
                let response = await startupService.updateStartupById(req.params.id, req.body)
                res.status(200).json({message: "Startup has been updated"})
            } catch (e) {
                res.status(400).json({error: e.message})
            }
        }
    }

export default startupController