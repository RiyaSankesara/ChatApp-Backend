const express = require('express');
const route = express.Router();

const friendCtrl = require('../controllers/friends');
const authHelper = require('../Helpers/AuthHelper');

route.post('/follow-user',authHelper.VerifyToken,friendCtrl.followUser);

module.exports = route;