const validate = (schema) => async (req, res, next) => {
    try {
        console.log(req);
        await schema.validate(req.body, {abortEarly: false});
        next();
    } catch (error) {
        res.status(400).json({errors: error.errors})
    }
}

export default validate