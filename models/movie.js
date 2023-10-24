const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
  },
  director: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле должно быть заполненно'],
  },
  year: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
  },
  description: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
  },
  image: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
    validate: {
      validator: function checkUrl(str) {
        return str && validator.isURL(str);
      },
      message: 'Введите корректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
    validate: {
      validator: function checkUrl(str) {
        return str && validator.isURL(str);
      },
      message: 'Введите корректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
    validate: {
      validator: function checkUrl(str) {
        return str && validator.isURL(str);
      },
      message: 'Введите корректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле должно быть заполненно'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
