const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();


router
  .get('/', authController.getIndex)
  
router
  .get('/login', authController.getLogin)
  .post('/login', authController.postLogin);

router
  .get('/register', authController.getRegister)
  .post('/register', authController.postRegister)

router
  .get('/forgot-password', authController.getForgetPassword)
  .post('/forgot-password', authController.postForgetPassword);

router
  .get('/profile' , authController.getProfile)
  .get('/logout', authController.logout);
  

module.exports = router;
