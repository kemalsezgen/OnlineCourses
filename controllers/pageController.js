const nodemailer = require("nodemailer");
const Course = require('../models/Course');
const User = require('../models/User');

exports.getHomePage = async (req, res) => {
  console.log(req.session.userID);
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role: 'student'});
  const totalTeachers = await User.countDocuments({role: 'teacher'});
  const teachers = await User.find({role: 'teacher'});
  res.status(200).render('index', {
    pageName: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
    teachers
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login',
  });
};

exports.getTeacherPage = async (req, res) => {
  const teachers = await User.find({role: 'teacher'});
  res.status(200).render('teachers', {
    pageName: 'teachers',
    teachers
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  
  <h1>Message Details</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone Number: ${req.body.phoneNumber}</li>
  <ul>
  <h3>Message: </h3>
  <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'kemalsezgen1@gmail.com', // gmail account
        pass: 'mapmtxqhbbnwtxou', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"From Online Course Contact Form" <kemalsezgen1@gmail.com>', // sender address
      to: 'kemalsezgen@gmail.com', // list of receivers
      subject: 'New Message from ONLINE COURSES Contact Page', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
    req.flash('success', 'We Received your message succesfully');

    res.status(200).redirect('contact');
  } catch (err) {
    req.flash('error', `Something happened!`);
  }
};