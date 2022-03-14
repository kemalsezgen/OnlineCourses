const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String
    }
  },
  { timestamps: true } // to keep createdAt info in Entity
);

CategorySchema.pre('validate', function (next) { // pre ile Course olusturulmadan once yapılacak işlemleri ayarlıyoruz.
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // Sadece harfleri ve sayıları alacak.
  });
  next();
});

const Category = mongoose.model('Category', CategorySchema); // convert to model
module.exports = Category; // export model