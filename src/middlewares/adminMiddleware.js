const adminCheck = (req, res, next) => {
    let role = "admin"
    let userRole = req.role.toLowerCase()
    if (userRole !== role) {
        return res.sendStatus(403).send("You do not have the permission to use this!")
    }
    return next();
}

export default adminCheck