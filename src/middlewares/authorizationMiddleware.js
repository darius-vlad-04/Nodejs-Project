const authorization = (requiredPermissions) => async (req, res, next) => {
    const userPermissions = req.permissions;
    let authorized = true;
    for (let requiredPermission of requiredPermissions) {
        if (!userPermissions.includes(requiredPermission)) {
            authorized = false
        }
    }

    if (authorized === false) {
        return res.sendStatus(403).send("You do not have the permission to use this!")
    } else {
        next();
    }

}

export default authorization