const express = require('express');
const cors = require("cors");
const { connectMongooDB } = require('./connection');

const userRouter = require('./routes/user');

const app = express();
app.use(cors())
app.use(express.json())

// Connect to Mongo DB
connectMongooDB().then(() => console.log("Mongoo Connected...")).catch((err) => console.log("Error in connection: ", err));

// Routes
app.use("/api/user", userRouter);

app.listen(8000, () => console.log("Server Started...."))