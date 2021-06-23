const Joi = require("joi");
const httpStatus = require("http-status-codes");
const user = require("../models/userModels");
const helper = require("../Helpers/helpers");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/authRoute");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/secret");

module.exports = {
  async createUser(req, res) {
    console.log(req.body);
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).min(8).required(),
    });

    const { error, value } = Joi.validate(req.body, schema);
    console.log(value);
    if (error && error.details) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: error.details });
    }

    const userEmail = await user.findOne({
      email: helper.lowercase(req.body.email),
    });
    if (userEmail) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Email already exists!" });
    }
    const userName = await user.findOne({
      email: helper.firstUpper(req.body.username),
    });
    if (userName) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "UserName already exists!" });
    }

    return bcrypt.hash(value.password, 10, function (err, hash) {
      if (err) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Error hashing password!" });
      }

      const body = {
        username: helper.firstUpper(value.username),
        email: helper.lowercase(value.email),
        password: hash,
      };
      user
        .create(body)
        .then((user) => {
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: '1h',
          });
          res.cookie('auth', token);
          res
            .status(httpStatus.CREATED)
            .json({ message: "User Created Successfully", user, token });
        })
        .catch((err) => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Error Occured" });
        });
    });
  },

  async loginUser(req,res){
    if(!req.body.username || !req.body.password)
    {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Not empty field allowed'
      })
    }
    await user.findOne({
      username: helper.firstUpper(req.body.username)
  }).then(user => {
    if(!user){
      return res.status(httpStatus.NOT_FOUND).json({
        message:'Username is not found'
      })
    }
    return bcrypt.compare(req.body.password,user.password).then((result) =>{
      if(!result){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message:'Password is incorrect'
        })
      }
      const token = jwt.sign({data: user} , dbConfig.secret,{
        expiresIn: '1h'
      });
      res.cookie('auth',token);
      return res.status(httpStatus.OK).json({
        message:'Login Successfully',user,token
      })
    })
  }).catch(err => {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message:'Error Occured'
    })
  })
}
};
