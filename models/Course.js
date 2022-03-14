const mongoose = require('mongoose');
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
      trim: true // remove spaces in desc's beginning and end
    },
  },
  { timestamps: true } // to keep createdAt info in Entity
);

const Course = mongoose.model('Course', CourseSchema); // convert to model
module.exports = Course; // export model