import users from '../api/services/users/routes';

const combinedRoutes = (app) => {
  app.use('/api/users', users);
  app.use(render404);
};

const render404 = (req, res) => {
  res.status(404);
  res.json({ error: 'Not found' });
};

export default combinedRoutes;
