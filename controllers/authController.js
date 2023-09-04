const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET.toString()
      ),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //login function
  loginUser: async (req, res) => {
    try {
      //check if the user is registered or not
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("wrong login details");
      // decrept the user password
      const decryptedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const depassword = decryptedPass.toString(CryptoJS.enc.Utf8);

      //check if the user password matches the one he enterd
      depassword !== req.body.password &&
        res.status(401).json("Wrong password");

      //to prevent the responce from sending data other than the email and pass
      const { password, __v, createdAt, ...others } = user._doc;
      //login the user
      res.status(200).json(others);
    } catch (error) {
      res.status(500);
    }
  },
};
