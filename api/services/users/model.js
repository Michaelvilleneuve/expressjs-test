import mongoose from 'mongoose';

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
  }
});

const User = mongoose.model('User', schema);

export default User;
