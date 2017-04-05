import userRoutes from '../api/services/users/routes';

const combinedRoutes = (app) => {
  app.use('/api/users', userRoutes);
};

export default combinedRoutes;
