const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash password before saving
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const crypt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, crypt);
    next();
});

schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model('User', schema);
