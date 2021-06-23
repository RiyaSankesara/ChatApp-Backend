const mongoose = require('mongoose');
const { post } = require('../routes/authRoute');

const userSchema = mongoose.Schema({
    username: {type : String},
    email: {type : String},
    password: {type : String},
    post: [
        {
            postId: { type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
            post: {type: String},
            created: { type: Date,default: Date.now()},
        }
    ],
    following: [
        {
            userFollowed: { type: mongoose.Schema.Types.ObjectId , ref: 'User'}
        }
    ],
    followers: [
        {
            follower: { type: mongoose.Schema.Types.ObjectId , ref: 'User'}
        }
    ]
});

module.exports = mongoose.model('User',userSchema);