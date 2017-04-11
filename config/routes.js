import users from '../api/services/users/routes';
import journeys from '../api/services/journeys/routes';

const combinedRoutes = (app) => {
  app.use('/api/users', users);
  app.use('/api/journeys', journeys);
  app.use(render404);
};

const render404 = (req, res) => {
  res.status(404);
  res.json({ error: 'Not found' });
};

export default combinedRoutes;
