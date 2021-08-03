const express = require('express');
const route = express.Router();

const messageCtrl = require('../controllers/message');
const authHelper = require('../Helpers/AuthHelper');

route.post('/chat-messages/:sender_Id/:receiver_Id',authHelper.VerifyToken,messageCtrl.sendMessage);
route.get('/chat-messages/:sender_Id/:receiver_Id',authHelper.VerifyToken,messageCtrl.getAllMessage);
module.exports = route; 
