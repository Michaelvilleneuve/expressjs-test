import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  fid_number: String
})

const User = mongoose.model('User', schema);
User.remove({}).exec();

export default User;
