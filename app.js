import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import params from 'strong-params';
import logParams from './middlewares/logs';
import routes from './config/routes';
import './config/database';
import './config/auth';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(params.expressMiddleware());
app.use(logParams);
app.use('/static', express.static('public'));
routes(app);

app.listen(port, () => console.log(`🎉  Server started on port ${port}`));

export default app;
