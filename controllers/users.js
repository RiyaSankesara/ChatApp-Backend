const User = require("../models/userModels");
const httpStatus = require("http-status-codes");
module.exports = {
  async getAllUsers(req, res) {
    await User.find({})
      .populate("post.postId")
      .populate("following.userFollowed")
      .populate("followers.follower")
      .then((users) => {
        return res.status(httpStatus.OK).json({
            message: "All Users",
            users,
          });
      }).catch((err) => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" });
      });
  },
  async getUser(req, res) {
    await User.findOne({
      _id: req.params.id
    })
    .populate("post.postId")
    .populate("following.userFollowed")
    .populate("followers.follower")
      .then((users) => {
        return res.status(httpStatus.OK).json({
            message: "User by Id",
            users,
          });
      }).catch((err) => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" });
      });
  },
  async getUserByName(req, res) {
    await User.findOne({
      username: req.params.username
    })
    .populate("post.postId")
    .populate("following.userFollowed")
    .populate("followers.follower")
      .then((users) => {
        return res.status(httpStatus.OK).json({
            message: "User by Username",
            users,
          });
      }).catch((err) => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" });
      });
  }
};
