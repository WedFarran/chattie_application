const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req,res)=>{
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }

        try{
            const UpdateUser = await User.findById(
                req.params.id, {
                    $set: req.body
                }, {new: true}
            );
            const { password, __v, createAt, ...others} = this.updateUser._doc;

            res.status(200).json(...others);
        }catch(error){
            res.status(500).json(error);
        }
    },

    /*deleteFriend: async (req,res)=>{
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }

        try{
            const UpdateUser = await User.findById(
                req.params.id, {
                    $set: req.body
                }, {new: true}
            );
            const { password, __v, createAt, ...others} = this.updateUser._doc;

            res.status(200).json(...others);
        }catch(error){
            res.status(500).json(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findById(req.params.id);
            res.status(200).json("Account Successfully Deleted")

        } catch (error) {
            
        }
    }*/

    getUser: async (req, res) => {
        try {
           const user = await User.findById(req.params.id);
           const {password, __v, createdAt, updateAt, ...userData} = user._doc;
            res.status(200).json(userData);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllFriends: async (req, res)=>{
        try {
            const allFriends = await User.find();
            res.status(200).json(allFriends);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //search for a friend 
    searchFriend: async(req, res) => {
        try {
            const results = await User.aggregate(
                [
                    {
                      $search: {
                        index: "chattiefriendssearch",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json(error);
        }
    }
}