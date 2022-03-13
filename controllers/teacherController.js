exports.getTeacherPage = (req, res) => {
  res.status(200).render('teachers', {
    pageName: 'teachers',
  });
};