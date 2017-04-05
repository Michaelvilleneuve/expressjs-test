import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import sha256 from 'sha256';
import config from '../../../config/config';

const SALT_WORK_FACTOR = 10;
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, 'Password must be at least 6 chars long']
  },
  fid_number: {
    type: String,
    required: true
  },
  token: String
});

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    // eslint-disable-next-line
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.generateToken(true);
      next();
    });
  });
});

schema.statics.authenticate = function (email, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, 'token password')
        .then((user) => {
          console.log(user);
          user.comparePassword(password, (isMatch) => {
            if (!isMatch) return reject();
            user.generateToken()
            .save((err, u) => {
              if (!err) resolve(u);
            });
          });
        })
        .catch(() => reject());
  });
};

schema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    callback(isMatch);
  });
};

schema.methods.generateToken = function (doNotSave) {
  console.log(sha256(`${this.email}${this.password}${config.secret}`));
  this.token = sha256(`${this.email}${this.password}${config.secret}`);
  if (!doNotSave) this.save();
  return this;
};

const User = mongoose.model('User', schema);

export default User;
