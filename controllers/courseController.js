const Course = require('../models/Course');
const Category = require('../models/Category');


exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name, //name'i buradan alacağım
      description: req.body.description, //descriptionu buradan alacağım
      category: req.body.category, //category'i buradan alacağım
      user: req.session.userID //user'i buradan alacağım
    });
    res.status(201).redirect('/courses');
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug:categorySlug});
    let filter = {};
    if(categorySlug) {
      filter = {category: category._id}
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

    res.status(200).render('courses', {
      pageName: 'courses',
      courses,
      categories,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug:req.params.slug}).populate('user');
    const categories = await Category.find();
    res.status(200).render('course', {
      pageName: 'course',
      course,
      categories
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      err,
    });
  }
};