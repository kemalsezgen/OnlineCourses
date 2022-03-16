const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage);
router.route('/teachers').get(pageController.getTeacherPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/contact').post(pageController.sendEmail);

module.exports = router;