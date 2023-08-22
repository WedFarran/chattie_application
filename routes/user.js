const router = require("express").Router();
const userController = require("../controllers/userController");
const {verifyAndAuthorization, verifyToken} = require("../middleware/verifyToken");

// Update user 
router.put("/:id", verifyAndAuthorization, userController.updateUser);

// get user 
router.get("/:id", verifyAndAuthorization, userController.getUser);

//get all friends it dosen't work
router.get("/:id", verifyAndAuthorization, userController.getAllFriends);

router.get("/search/:key", userController.searchFriend);


module.exports = router