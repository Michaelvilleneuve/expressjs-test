import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  image: String,
  starts_at: Date,
  ends_at: Date,
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, select: false }
});

const Product = mongoose.model('Journey', schema);

export default Product;
