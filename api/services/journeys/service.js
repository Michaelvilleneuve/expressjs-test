import Journey from './model';

const Journeys = {
  index(req, res) {
    req.user.journeys().exec((err, journeys) => res.json(journeys));
  },

  show(req, res) {
    Journey.findOne(this.journey(req))
        .select('title description lat lng image')
        .then((user) => res.json(user))
        .catch(() => res.sendStatus(404));
  },

  create(req, res) {
    const journey = new Journey(this.params(req));
    journey.save()
        .then(() => res.json(journey))
        .catch((err) => res.status(422).json(err));
  },

  update(req, res) {
    Journey.update(this.journey(req), this.params(req))
        .then((journey) => res.json(journey))
        .catch((err) => res.status(422).json(err));
  },

  destroy(req, res) {
    Journey.remove(this.journey(req)).then(() => res.sendStatus(200));
  },

  params(req) {
    const params = req.parameters.permit(
      'title', 'description', 'image', 'lng', 'lat', 'starts_at', 'ends_at'
    ).value();
    return Object.assign({ user: req.user }, params);
  },

  journey(req) {
    return { _id: req.params.id, user: req.user };
  },
};

export default Journeys;
