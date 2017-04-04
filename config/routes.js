import express from 'express';
import services from '../api/services';

const router = express.Router();

router.get('/users', (req, res) => services.Users.index(req, res));

export default router;
