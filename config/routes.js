import express from 'express';
import s from '../api/services';

const router = express.Router();

router.get('/users', (req, res) => s.Users.index(req, res));
router.post('/users', (req, res) => s.Users.create(req, res));
router.get('/users/:id', (req, res) => s.Users.show(req, res));
router.delete('/users/:id', (req, res) => s.Users.destroy(req, res));

export default router;
