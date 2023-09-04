const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString();
    }

    try {
      const UpdateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, __v, createAt, ...others } = this.updateUser._doc;

      res.status(200).json(...others);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteFriend: async (req, res) => {
    try {
      const DeleteFriend = await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: friends[req.body],
        },
        { new: true }
      );
      const { password, __v, createAt, ...others } = this.updateUser._doc;

      res.status(200).json(...others);
      /* User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: { _id: req.params.linkId } } },
        { safe: true, upsert: true },
        function (err, node) {
          if (err) {
            return handleError(res, err);
          }
          return res.status(200).json(node.configuration.links);
        }
      );
      const { id, friendID } = req.params;
      console.log(id, friendID);

      console.log(id, friendID);
      const user = User.findOne({ id: id });

      if (!user) {
        return res.status(404).json("user not found");
      }

      user.friends.pull(friendID);
      await user.save();

      res.status(200).json("done");*/
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, __v, createdAt, updateAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllFriends: async (req, res) => {
    try {
      const allFriends = await User.find();
      res.status(200).json(allFriends);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //search for a friend
  searchFriend: async (req, res) => {
    try {
      const results = await User.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
