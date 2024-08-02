const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/signup', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.json({ success: false, message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.json({ success: false, message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ success: true });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.json({ success: false, message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ success: false, message: "Invalid username or password" });
    }

    res.json({ success: true });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
