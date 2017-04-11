import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import sha256 from 'sha256';
import config from '../../../config/config';
import Journey from '../journeys/model';

const SALT_WORK_FACTOR = 10;
const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, 'Password must be at least 6 chars long']
  },
  fid_number: { type: String, required: true },
  token: String,
});

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    // eslint-disable-next-line
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.generateToken();
      next();
    });
  });
});

// eslint-disable-next-line
schema.post('remove', function (user) {
  Journey.remove({ user }).exec();
});

schema.statics.authenticate = function (email, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, 'token password')
        .then((user) => {
          user.comparePassword(password)
              .then(() => resolve(user))
              .catch(() => reject());
          })
          .catch(() => reject());
  });
};

schema.methods.comparePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      isMatch ? resolve() : reject();
    });
  });
};

schema.methods.generateToken = function () {
  this.token = sha256(`${this.email}${this.password}${config.secret}`);
  return this;
};

schema.methods.journeys = function () {
  return Journey.find({ user: this });
};

const User = mongoose.model('User', schema);

export default User;
