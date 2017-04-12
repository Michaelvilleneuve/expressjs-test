import express from 'express';
import { auth } from '../../../config/auth';
import Users from './service';

const router = express.Router();

router.route('/')
      .get(auth, (req, res) => Users.index(req, res))
      .post((req, res) => Users.create(req, res))
      .delete(auth, (req, res) => Users.destroy(req, res));

router.route('/me').get(auth, (req, res) => Users.me(req, res));

router.route('/:id')
      .get((req, res) => Users.show(req, res));

router.post('/signin', (req, res) => Users.signIn(req, res));

export default router;
