const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controllers/userController");

//Router object
const router = express.Router();

//Get all users || GET
router.get("/get-all-users", getAllUsers);
//Create a new user || POST
router.post("/register", registerUser);
//Login a user || POST
router.post("/login", loginUser);

module.exports = router;
