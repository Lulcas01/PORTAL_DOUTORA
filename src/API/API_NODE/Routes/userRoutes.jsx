const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require ('../cors.jsx');
require ('../authenticate.jsx')

const userController = require('../Controllers/userController.jsx')

router.options('/', cors.corsWithOptions, userController.corsAuth);
router.get('/', cors.corsWithOptions, userController.getUsers);
router.post('/', cors.corsWithOptions, userController.signUp);
router.post('/login', cors.corsWithOptions, passport.authenticate('local', {session: false}), userController.login);

module.exports = router;
