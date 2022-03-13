const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.route('/').get(courseController.getCoursePage);

module.exports = router;