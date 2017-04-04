import express from 'express';
import morgan from 'morgan';
import routes from './config/routes';
import db from './config/database';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
