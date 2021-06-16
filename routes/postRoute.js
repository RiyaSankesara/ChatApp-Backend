const express = require('express');
const route = express.Router();

const postCtrl = require('../controllers/posts');
const authHelper = require('../Helpers/AuthHelper');


route.post('/post/add-post',authHelper.VerifyToken, postCtrl.addPost);

route.get('/post',authHelper.VerifyToken,postCtrl.getAllPost);

module.exports = route;

