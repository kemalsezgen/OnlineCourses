const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute.js');
const teacherRoute = require('./routes/teacherRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const userRoute = require('./routes/userRoute.js');


const app = express();

// Connect to Database
mongoose
  .connect('mongodb://localhost/onlinecourse-db')
  .then(() => {
    console.log('Database connected successfuly');
  });

// Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIN = null;

// Middlewares
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/teachers', teacherRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);



const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
