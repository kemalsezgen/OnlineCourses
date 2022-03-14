const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).render('courses', {
      pageName: 'courses',
      courses,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err,
    });
  }
};