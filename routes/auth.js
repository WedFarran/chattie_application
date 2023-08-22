const router = require("express").Router();
const authController = require("../controllers/authController");


// registration 
router.post("/register", authController.createUser);


// login
router.post("/login", authController.loginUser);


module.exports = router