const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
        let token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth