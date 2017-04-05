import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import params from 'strong-params';
import routes from './config/routes';
import db from './config/database'; // eslint-disable-line no-unused-vars

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(params.expressMiddleware());
routes(app);

app.listen(port, () => console.log(`Server started on port ${port}`));
