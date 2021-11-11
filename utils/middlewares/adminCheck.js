const adminCheck = (req, res, next) => {
    if (req.headers.admin === 'true') {
        next()
    } else {
        const resObj = {
            error: '401',
            description: `Usuario no autorizado para el método ${req.method} en la ruta ${req.originalUrl}`
        }
        res.status(401).json(resObj)
    }
}

module.exports = adminCheck;