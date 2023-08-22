const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema(
    {
        username: {type: String, required: false, unique: false, default: 'Chattie user'},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true, unique: false},
        age: {type: String, required: false, unique: false},
        birthdate: {type: Date, required: false, unique: false},
        nationality: {type: String, required: false, unique: false},
        city: {type: String, required: false, unique: false},
        hobby: {type: String, required: false, unique: false},
        image: {type: String, required:true, default: 'https://firebasestorage.googleapis.com/v0/b/pager-3c967.appspot.com/o/chattie%2Flogo_blue.png?alt=media&token=e201a654-d624-45d3-a468-e635c8c6b62f'}
    }, {timestamps: true}
);

module.exports = mongoose.model("Friend", FriendSchema);