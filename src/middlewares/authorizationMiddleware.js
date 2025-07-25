const authorization = (permission) => async (req, res, next) => {

    const permissions = req.permissions
    if (!permissions.includes(permission)) {
        return res.sendStatus(403).send("You do not have the permission to use this!")
    } else {
        next();
    }

}

export default authorization