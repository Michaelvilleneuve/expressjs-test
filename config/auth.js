import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import User from '../api/services/users/model';

passport.use(new BearerStrategy(
  (token, done) => {
    User.findOne({ token })
        .then((user) => done(null, user))
        .catch((err) => done(null, false, err));
  }
));

export const auth = passport.authenticate('bearer', { session: false });
