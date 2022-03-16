const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true, // remove spaces in desc's beginning and end
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true } // to keep createdAt info in Entity
);

CourseSchema.pre('validate', function (next) {
  // pre ile Course olusturulmadan once yapılacak işlemleri ayarlıyoruz.
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // Sadece harfleri ve sayıları alacak.
  });
  next();
});

const Course = mongoose.model('Course', CourseSchema); // convert to model
module.exports = Course; // export model
