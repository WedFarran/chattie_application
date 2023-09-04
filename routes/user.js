const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyAndAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

// Update user
router.put("/:id", userController.updateUser);

// get user
//router.get("/:id", verifyAndAuthorization, userController.getUser);

//get all friends
//router.get("/:id", verifyAndAuthorization, userController.getAllFriends);

//add friend
//router.get("/:id", verifyAndAuthorization, userController.addFriend);

//delete friend
router.put("/:id", userController.deleteFriend);

//get profile
//router.get("/:id", verifyAndAuthorization, userController.addFriend);

//search friends
router.get("/search/:key", userController.searchFriend);

module.exports = router;
