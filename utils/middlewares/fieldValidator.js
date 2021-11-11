const fieldValidator = (req, res, next) => {
    const fieldsInBody = Object.keys(req.body);
    const fieldsToCheck = ['name', 'price', 'code', 'description', 'stock', 'imageUrl'];
    const result =
        fieldsInBody.length === fieldsToCheck.length &&
        fieldsInBody.every(function (element) {
            return fieldsToCheck.includes(element);
        });
    if (result === true) {
        next()
    } else {
        const resObj = {
            error: '400',
            description: `Invalid body of request. Please check that all fields are defined.`
        }
        res.status(400).json(resObj)
    }
}

module.exports = fieldValidator;