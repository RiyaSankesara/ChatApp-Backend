const express = require('express');
const route = express.Router();

const userCtrl = require('../controllers/users');
const authHelper = require('../Helpers/AuthHelper');

route.get('/users',authHelper.VerifyToken,userCtrl.getAllUsers);
route.get('/users/:id',authHelper.VerifyToken,userCtrl.getUser);
route.get('/users/:username',authHelper.VerifyToken,userCtrl.getUserByName);
module.exports = route;