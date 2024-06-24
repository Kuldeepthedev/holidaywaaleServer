const express = require('express');
const { sendOtp, resendOtp, userRegistration, userLogin, userLogout } = require('../../controller/users/user');
const route = express.Router();

route.post('/otp/send' , sendOtp)
route.post('/otp/resend',resendOtp)
route.post('/ragistrer',userRegistration)
route.post('/login',userLogin)
route.get('/logout',userLogout)
module.exports = route;
