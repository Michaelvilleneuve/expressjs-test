import Journey from './model';

const Journeys = {

  index(req, res) {
    req.user.journeys()
        .exec((err, journeys) => res.json(journeys));
  },

  show(req, res) {
    Journey.findById(req.params.id)
        .select('email name fid_number')
        .then((user) => res.json(user))
        .catch(() => res.sendStatus(404));
  },

  create(req, res) {
    const journey = new Journey(this.params(req));
    journey.save()
        .then(() => res.json(journey))
        .catch((err) => res.status(422).json(err));
  },

  destroy(req, res) {
    Journey.remove({ _id: req.params.id })
        .then(() => res.sendStatus(200));
  },

  params(req) {
    const params = req.parameters.permit('title', 'description', 'image', 'lng', 'lat').value();
    return Object.assign({ user: req.user }, params);
  },
};

export default Journeys;
