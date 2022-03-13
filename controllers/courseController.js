exports.getCoursePage = (req, res) => {
  res.status(200).render('courses', {
    pageName: 'courses',
  });
};