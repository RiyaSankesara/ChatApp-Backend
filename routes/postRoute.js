const { Router } = require('express');
const express = require('express');
const route = express.Router();

const postCtrl = require('../controllers/posts');
const authHelper = require('../Helpers/AuthHelper');

route.get('/post',authHelper.VerifyToken,postCtrl.getAllPost);
route.get('/postbyid/:id',authHelper.VerifyToken,postCtrl.getPostById);

route.post('/post/add-post',authHelper.VerifyToken, postCtrl.addPost);
route.post('/post/add-like',authHelper.VerifyToken, postCtrl.addLike);
route.post('/post/add-comment',authHelper.VerifyToken, postCtrl.addComment);
module.exports = route;

