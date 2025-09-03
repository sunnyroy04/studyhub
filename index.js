// Load environment variables from .env file
require('dotenv').config();

// Express setup
const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const courseRoutes = require('./routes/course');

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/courses', courseRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
