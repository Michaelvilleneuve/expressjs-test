import User from '../../../api/models/user';

const Users = {

  index(req, res) {
    User.find({}, (err, users) => res.json(users));
  },

  show(req, res) {
    User.find({ _id: req.params.id })
        .then((user) => res.json(user))
        .catch(() => res.sendStatus(404));
  },

  create(req, res) {
    const user = new User(this.params(req));
    user.save()
        .then(() => res.json(user))
        .catch((err) => res.json(err));
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
