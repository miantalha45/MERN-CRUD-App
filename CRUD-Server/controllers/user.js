const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json("Sorry! Something Went Wrong...");
    }
}

async function handleGetUserByID(req, res) {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json("Sorry! Something Went Wrong...");
    }
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    console.log(body)
    try {
        if (!body || !body.Email || !body.Name)
            return res.status(400).json("Invalid Credentials");
        const user = await User.findOne({ Email: body.Email });
        console.log(user)
        if (user)
            return res.status(409).json("Email Already Exists");

        const response = await User.create({
            Name: body.Name,
            Email: body.Email,
            Age: Number(body.Age)
        });
        console.log("response", response);

        return res.status(201).json({ success: "User Created Successfully.", Id: response._id });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json("Sorry! Something Went Wrong...");
    }
}

async function handleUpdateUser(req, res) {
    const body = req.body;
    console.log(body);

    try {
        if (!body || !body.Email || !body.Name) {
            return res.status(400).json("Invalid Credentials");
        }

        const user = await User.findByIdAndUpdate(
            body._id,
            {
                Name: body.Name,
                Email: body.Email,
                Age: body.Age
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json("User Not Found.");
        }

        return res
            .status(200)
            .json({ success: "User Updated Successfully.", Id: user._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Sorry! Something Went Wrong...");
    }
}

async function handleDeleteUserByID(req, res) {
    const body = req.params;
    console.log(req.params.id)
    try {
        if (!body.id)
            return res.status(400).json("Invalid User ID");

        const user = await User.findByIdAndDelete(body.id, { new: true });
        if (!user)
            return res.status(404).json("User not found.")

        return res.status(200).json({ success: "User Deleted Successfully." });
    } catch (error) {

    }
}


module.exports = {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserByID,
    handleUpdateUser,
    handleDeleteUserByID
}