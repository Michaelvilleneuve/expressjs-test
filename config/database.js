import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/voyage');
const db = mongoose.connection;

db.on('error', () => console.error('Mongodb error'));
db.once('open', () => console.log('🎉  Connected to db'));

export default db;
