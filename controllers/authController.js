const bcrypt = require('bcrypt');
const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');



exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; //useri çekiyoruz
    // ikiside aynı oldugu icin direkt ({email}) olarak yazılabilir.
    await User.findOne({ email: email }, (error, user) => {
      //userin emaili ile databaseden o useri çekiyorum
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          // compare ile şifreleri karşılaştırıyoruz, same == true ise giris yaptırıyorum.
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/');
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id: req.session.userID}).populate('courses'); // userin içerisindeki course'lara ulaşmak için populate kullandık
  const categories = await Category.find();
  const courses = await Course.find({user: req.session.userID});
  const users = await User.find();
  res.status(200).render('dashboard', {
    pageName: "dashboard",
    user,
    categories,
    courses,
    users
  });
};