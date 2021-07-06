const User = require("../models/userModels");
const httpStatus = require("http-status-codes");

module.exports = {
  followUser(req, res) {
    const followUser = async () => {
      await User.update(
        {
          _id: req.user._id,
          "following.userFollowed": { $ne: req.body.userFollowed },
        },
        {
          $push: {
            following: {
              userFollowed: req.body.userFollowed, // login user follwed another user.
            },
          },
        }
      );
      await User.update(
        {
          _id: req.body.userFollowed,
          "following.follower": { $ne: req.user._id },
        },
        {
          $push: {
            followers: {
              follower: req.user._id,
            },
            notifications: {
              senderId: req.user._id,
              message: `${req.user.username} is now following you.`,
              created: new Date(),
              viewProfile: false,
            },
          },
        }
      );
    };
    followUser()
      .then(() => {
        res.status(httpStatus.OK).json({ message: "Following User Now" });
      })
      .catch((err) => {});
  },
  unfollowUser(req, res) {
    const unfollowUser = async () => {
      await User.update(
        {
          _id: req.user._id,
        },
        {
          $pull: {
            following: {
              userFollowed: req.body.userFollowed,
            },
          },
        }
      );
      await User.update(
        {
          _id: req.user.userFollowed,
        },
        {
          $pull: {
            followers: {
              follower: req.body._id,
            },
          },
        }
      );
    };
    unfollowUser()
      .then(() => {
        res.status(httpStatus.OK).json({ message: "UnFollowing User Now" });
      })
      .catch((err) => {});
  },
  async markNotification(req, res) {
    if (!req.body.Isdelete) {
      await User.updateOne(
        {
          _id: req.user._id,
          "notifications._id": req.params.id,
        },
        {
          $set: {
            "notifications.$.read": true,
          },
        }
      )
        .then(() => {
          res.status(httpStatus.OK).json({ message: "Marked as Read" });
        })
        .catch((err) => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Error occured" });
        });
    } else {
      await User.update(
        {
          _id: req.user._id,
          "notifications._id": req.params.id,
        },
        {
          $pull: {
            notifications: {
              _id: req.params.id,
            },
          },
        }
      )
        .then(() => {
          res.status(httpStatus.OK).json({ message: "Deleted Successfully" });
        })
        .catch((err) => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Error occured" });
        });
    }
  },
  async markAllNotification(req, res) {
    console.log(req.body);
    await User.update(
      {
        _id: req.user._id,
      },
      {
        $set: {
          'notifications.$[elem].read': true
        }
      },
      {
      arrayFilters: [{
        'elem.read' : false
      }],multi: true
      }
    ).then(() => {
      res.status(httpStatus.OK).json({ message: "Mark all Successfully" });
    })
    .catch((err) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    });
  },
};
