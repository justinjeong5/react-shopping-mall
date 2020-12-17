const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  cart: {
    type: Array,
    default: []
  },
})

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    // bcryptjs
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next()
      });
    });
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
  var user = this;
  bcrypt.compare(plainPassword, user.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  })
}

userSchema.methods.generateToken = function (callback) {
  var user = this;
  // jsonwebtoken
  var token = jwt.sign(user._id.toHexString(), 'jsonwebtoken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  })
}

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // token을 복호화한다
  jwt.verify(token, 'jsonwebtoken', function (err, decoded) {
    if (err) return callback(err);
    user.findOne({
      "_id": decoded,
      "token": token
    }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    })
  })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }