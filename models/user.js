const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Введите email'],
    validate: {
      validator: function checkEmail(str) {
        return str && validator.isEmail(str);
      },
      message: 'Введите корректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Вы ввели неправильный логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Вы ввели неправильный логин или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
