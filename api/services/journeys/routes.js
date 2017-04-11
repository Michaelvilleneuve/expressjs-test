import express from 'express';
import { auth } from '../../../config/auth';
import Journeys from './service';

const router = express.Router();

router.route('/')
      .get(auth, (req, res) => Journeys.index(req, res))
      .post(auth, (req, res) => Journeys.create(req, res));

router.route('/:id')
      .put(auth, (req, res) => Journeys.update(req, res))
      .get(auth, (req, res) => Journeys.show(req, res))
      .delete(auth, (req, res) => Journeys.destroy(req, res));

export default router;
