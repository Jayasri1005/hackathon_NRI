const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const User = require('./models/User');
const session = require('express-session');
const path = require('path');

// Load environment variables
// thiss is hackathon project 
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use session for user login state
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Render signup page
app.get('/signup', (req, res) => {
    res.render('signup', { errors: [] });
});
app.get('/login', (req, res) => {
    res.render('login', { errors: [] });
});
app.get('/', (req, res) => {
    res.render('index', { errors: [] });
});
app.get('/route-management', (req, res) => {
    res.render('route-management', { errors: [] });
});
app.get('/schedule-management', (req, res) => {
    res.render('schedule-management', { errors: [] });
});

// Handle Signup Form Submission
app.post('/signup', [
    // Validate password and confirm password match
    body('password').custom((value, { req }) => {
        if (value !== req.body.confirm_password) {
            throw new Error('Passwords must match');
        }
        return true;
    }),
    // Validate required fields
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('signup', { errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('Email already exists');
        }

        // Create new user with plain text password (no hashing)
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Redirect to login page after successful signup
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.send('Error registering user');
    }
});

// Render login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the entered password with the stored plain text password
        if (password !== user.password) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Save user info in session (for authenticated users)
        req.session.user = user;

        // Debugging log: Display success message
        console.log('Login successful');

        // Redirect or send success response
        res.redirect('/'); // or use res.send('Login successful');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
