const express = require('express');

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/about', (req, res) => {
  res.status(200).render('about');
});
app.get('/course', (req, res) => {
  res.status(200).render('course');
});
app.get('/teacher', (req, res) => {
  res.status(200).render('teacher');
});
app.get('/contact', (req, res) => {
  res.status(200).render('contact');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
