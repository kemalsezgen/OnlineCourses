const express = require('express');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute.js');
const teacherRoute = require('./routes/teacherRoute.js');


const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/teachers', teacherRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
