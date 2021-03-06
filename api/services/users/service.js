import User from './model';

const Users = {

  index(req, res) {
    User.find({})
        .select('email name')
        .exec((err, users) => res.json(users));
  },

  show(req, res) {
    User.findById(req.params.id)
        .select('email name')
        .then((user) => res.json(user))
        .catch(() => res.sendStatus(404));
  },

  me(req, res) {
    User.findById(req.user.id)
        .select('email name')
        .then((user) => res.json(user))
        .catch(() => res.sendStatus(404));
  },

  signIn(req, res) {
    const params = req.parameters.all();
    User.authenticate(params.email, params.password)
        .then((user) => res.json({
          user: {
            email: user.email,
            name: user.name,
            token: user.token
          }
        }))
        .catch(() => res.sendStatus(422));
  },

  create(req, res) {
    const user = new User(this.params(req));
    user.generateToken(true).save()
        .then(() => res.json({ token: user.token, user }))
        .catch((err) => res.status(422).json(err));
  },

  destroy(req, res) {
    User.findOneAndRemove({ _id: req.user.id }, (err, user) => {
      user.remove();
      res.sendStatus(200);
    });
  },

  params(req) {
    return req.parameters.permit('email', 'name', 'password', 'fid_number').value();
  },
};

export default Users;
