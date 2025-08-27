const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

async function connectMongooDB() {
    return mongoose.connect(process.env.MONGO_URI);
}

module.exports = {
    connectMongooDB
}