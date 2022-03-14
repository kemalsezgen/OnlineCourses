const express = require('express');
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute.js');
const teacherRoute = require('./routes/teacherRoute.js');

const app = express();

// Connect to Database
mongoose
  .connect('mongodb://localhost/onlinecourse-db')
  .then(() => {
    console.log('Database connected successfuly');
  });

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/teachers', teacherRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
