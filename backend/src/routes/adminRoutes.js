const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const authMiddleware = require('../middlewares/authMiddleware'); // Import authentication middleware
const checkAdmin = require('../middlewares/checkAdmin'); // Import admin check middleware
//get all users (admin only)
router.get('/users', authMiddleware, checkAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
//delete user by id (admin only)
router.delete('/users/:id', authMiddleware, checkAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);   
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }       
});

module.exports = router;