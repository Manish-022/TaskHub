const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
        
    }
    next(); // If user is admin, proceed to the next middleware/route handler
};
module.exports = checkAdmin;