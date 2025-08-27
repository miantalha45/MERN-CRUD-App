const express = require("express");
const { handleGetAllUsers, handleCreateNewUser, handleGetUserByID, handleUpdateUser, handleDeleteUserByID } = require('../controllers/user');

const router = express.Router();

router.get("/", handleGetAllUsers);
router.post("/", handleCreateNewUser);
router.get("/:id", handleGetUserByID);
router.patch("/", handleUpdateUser);
router.delete("/:id", handleDeleteUserByID)

module.exports = router;