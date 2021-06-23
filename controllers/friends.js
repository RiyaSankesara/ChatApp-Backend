const User = require("../models/userModels");
const httpStatus = require("http-status-codes");

module.exports = {
    followUser(req,res){
        const followUser = async () => {
            await User.update({
                _id: req.user._id,
                'following.userFollowed': { $ne: req.body.userFollowed}
            }, {
                $push: {
                    following:{
                        userFollowed: req.body.userFollowed
                    }
                }
            });
            await User.update({
                _id: req.user.userFollowed,
                'followers.follower': { $ne: req.body._id}
            }, {
                $push: {
                    followers:{
                        follower: req.body._id
                    }
                }
            });
        }
        followUser().then(() => {
            res
            .status(httpStatus.OK)
            .json({ message: "Following User Now" });
        }).catch(err => {

        })
    }
}

