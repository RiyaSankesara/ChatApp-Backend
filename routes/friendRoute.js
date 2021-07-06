const express = require('express');
const route = express.Router();

const friendCtrl = require('../controllers/friends');
const authHelper = require('../Helpers/AuthHelper');

route.post('/follow-user',authHelper.VerifyToken,friendCtrl.followUser);
route.post('/unfollow-user',authHelper.VerifyToken,friendCtrl.unfollowUser);
route.post('/mark/:id',authHelper.VerifyToken,friendCtrl.markNotification);
route.post('/mark-all',authHelper.VerifyToken,friendCtrl.markAllNotification);
module.exports = route; 
