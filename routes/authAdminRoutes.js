const express = require('express');

const authAdminController = require('../controllers/authAdminController');

const router = express.Router();

// prettier-ignore
router
  .get('/registerAdmin', authAdminController.getIndex)
  .post('/registerAdmin', authAdminController.postIndex)

router
  .get('/loginAdmin', authAdminController.getLogin)
  .post('/loginAdmin', authAdminController.postLogin);

router.get('/registerAdmin', authAdminController.getRegister);

router
  .get('/forgot-password', authAdminController.getForgetPassword)
  .post('/forgot-password', authAdminController.postForgetPassword);

router
  .get('/profile' , authAdminController.getProfile)
  .get('/logout', authAdminController.logout);


module.exports = router;
