import User from '../../../api/models/user';

const Users = {
  index(req, res) {
    User.find({}, (err, users) => res.json(users));
  }
};

export default Users;
