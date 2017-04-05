import express from 'express';
import Users from './service';

const routes = express.Router();

routes.get('/', (req, res) => Users.index(req, res));
routes.post('/', (req, res) => Users.create(req, res));
routes.get('/:id', (req, res) => Users.show(req, res));
routes.delete('/:id', (req, res) => Users.destroy(req, res));

export default routes;
