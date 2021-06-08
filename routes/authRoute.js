const express = require('express');
const route = express.Router();

const authCtrl = require('../controllers/auth');



route.post('/RegisterUser',authCtrl.createUser);
route.post('/Login',authCtrl.loginUser);
module.exports = route;

