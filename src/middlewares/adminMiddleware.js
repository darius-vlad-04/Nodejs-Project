const adminCheck = (req, res, next) => {
    let role = "admin"
    console.log(req)
    let userRole = req.role.toLowerCase()
    if (userRole !== role) {
        return res.sendStatus(403).send("You do not have the permission to view this!")
    }
    return next();
}

export default adminCheck