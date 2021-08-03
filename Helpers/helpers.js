const user = require("../models/userModels");

module.exports = {
  firstUpper: (username) => {
    const name = username.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
  },
  lowercase: (str) => {
    return str.toLowerCase();
  },

  updateChatList: async (req, message) => {
    await user.update(
      {
        _id: req.user._id,
      },
      {
        $pull: {
          chatList: {
            receiverId: req.params.receiver_id,
          },
        },
      }
    );
    await user.update(
      {
        _id: req.params.receiver_id
      },
      {
        $pull: {
          chatList: {
            receiverId: req.user._id,
          },
        },
      }
    );
    await User.update(
        {
          _id: req.user._id,
        },
        {
          $push: {
            chatList: {
              $each: [
                // for array
                {
                  receiverId: req.params.receiver_Id,
                  msgId: message._id,
                },
              ],
              $position: 0,
            },
          },
        }
      );

      await User.update(
        {
          _id: req.params.receiver_Id,
        },
        {
          $push: {
            chatList: {
              $each: [
                // for array
                {
                  receiverId: req.user._id,
                  msgId: message._id,
                },
              ],
              $position: 0,
            },
          },
        }
      );
  }
};
