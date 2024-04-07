const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);

        // Add a check to ensure the decoded token includes the email
        if (!decoded || !decoded.email) {
            throw new Error('Token is invalid'); // This will be caught by the catch block below
        }

        // Add the email to the user object in the request
        req.user = { email: decoded.email };
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = auth;
