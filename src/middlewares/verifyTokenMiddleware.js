import jwt from "jsonwebtoken"

const tokenValidation = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(data)
        req.userId = data.userId;
        req.role = data.role
        req.permissions = data.permissions
        return next();
    } catch {
        return res.sendStatus(403);
    }

}


export default tokenValidation;
