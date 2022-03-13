const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.route('/').get(teacherController.getTeacherPage);

module.exports = router;