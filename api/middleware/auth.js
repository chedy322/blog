const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.cookies.token; // Get the token from the 'token' cookie

    if (!token) {
        return res.status(401).send('Access denied'); // Change to return status code and message
    }

    try {
        const decoded = jwt.verify(token, 'chedy');
        req.user = { id: decoded.id, username: decoded.username };
        next();
    } catch (err) {
        res.status(401).send('Invalid token'); // Change to return status code and message
    }
};

module.exports = authorize;
