import express from 'express';
import { auth } from '../../../config/auth';
import Journeys from './service';

const router = express.Router();

router.route('/')
      .get(auth, (req, res) => Journeys.index(req, res))
      .post(auth, (req, res) => Journeys.create(req, res))
      .put(auth, (req, res) => Journeys.update(req, res))
      .delete(auth, (req, res) => Journeys.destroy(req, res));

router.route('/:id')
      .get((req, res) => Journeys.show(req, res));

export default router;
