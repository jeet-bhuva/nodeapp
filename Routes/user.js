const express = require("express");
const router = express.Router();
const {Register, Login} = require('../Controller/userController')

//create user
router.post('/',Register);
router.post('/login',Login)

module.exports = router;