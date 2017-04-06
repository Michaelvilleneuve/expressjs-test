import express from 'express';
import { auth } from '../../../config/auth';
import Users from './service';

const router = express.Router();

router.route('/')
      .get(auth, (req, res) => Users.index(req, res))
      .post((req, res) => Users.create(req, res));

router.route('/:id')
      .get((req, res) => Users.show(req, res))
      .delete((req, res) => Users.destroy(req, res));

router.post('/signin', (req, res) => Users.signIn(req, res));

export default router;
