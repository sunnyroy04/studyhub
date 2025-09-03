const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    if (await Admin.findOne({ username })) {
        return res.status(400).json({ message: 'Admin already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashed });
    await admin.save();
    res.json({ message: 'Admin signup successful' });
};

exports.authenticateAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, 'secretkey');
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(401).json({ message: 'Invalid token' });
        req.admin = admin;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};
