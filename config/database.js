import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/');
const db = mongoose.connection;

db.on('error', () => console.error(console, 'Mongodb error'));
db.once('open', () => console.log('connected to db'));

export default db;
