const Joi = require("joi");
const httpStatus = require("http-status-codes");
const Post = require('../models/postModels');
const User = require('../models/userModels');


module.exports =  {
    addPost(req,res){
        const schema = Joi.object().keys({
            post: Joi.string().required()
          });
          const { error, value } = Joi.validate(req.body, schema);
          if (error && error.details) {
            return res
              .status(httpStatus.BAD_REQUEST)
              .json({ msg: error.details });
          }
          const body = {
              user: req.user._id,
              username: req.user.username,
              post: req.body.post,
              created: new Date()
          }
          Post
          .create(body)
          .then(async post => {    
              await User.update({
                  _id: req.user._id
              },{
                  $push: {
                    post: {
                        postId: post._id,
                        post: req.body.post,
                        created: new Date()
                    }
                  }
              })
            res
              .status(httpStatus.OK)
              .json({ message: "Post Created Successfully", Post});
          })
          .catch((err) => {
            res
              .status(httpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: "Error Occured" });
          });
         
    },
    async getAllPost(req,res){
      try {
        const posts = await Post.find({}).populate('user').sort({
          created: -1
        }); 
        return res.status(httpStatus.OK).json({
          message:'All posts',posts
        });
      } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message:'Error Occured'
        })
      }
    }
};