const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Age: {
        type: Number,
    }
}, { timestamps: true });

const USER = model("CRUD-User", userSchema);

module.exports = USER;