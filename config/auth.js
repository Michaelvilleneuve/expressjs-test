import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../api/services/users/model';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ email, password })
        .then((user) => done(null, user))
        .catch((err) => done(null, false, err));
  }
));
