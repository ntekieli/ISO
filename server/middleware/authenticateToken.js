import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    jwt.verify(token, 'secret_key', (error, user) => {
        if (error) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;