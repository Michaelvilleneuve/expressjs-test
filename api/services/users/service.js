import sha256 from 'sha256';
import config from '../../../config/config';
import User from './model';

const Users = {

  index(req, res) {
    User.find({})
        .select('email name fid_number')
        .exec((err, users) => res.json(users));
  },

  show(req, res) {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(() => res.sendStatus(404));
  },

  signIn(req, res) {
    User.findOneAndUpdate(
      { email: req.parameters.email, password: req.parameters.password },
      { token: sha256(`${req.parameters.email}${req.parameters.password}${config.secret}`) },
      (err, user) => {
        console.log(user, err);
        res.json(user);
      }
    );
  },

  create(req, res) {
    const user = new User(this.params(req));
    user.token = sha256(`${user.email}${user.password}${config.secret}`);
    user.save()
        .then(() => res.json(user))
        .catch((err) => {
          res.status(422);
          res.json(err);
        });
  },

  destroy(req, res) {
    User.remove({ _id: req.params.id })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(404));
  },

  params(req) {
    return req.parameters.permit('email', 'name', 'password', 'fid_number').value();
  },
};

export default Users;
