const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

 
userSchema.pre('save', async function(next) {
   
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
