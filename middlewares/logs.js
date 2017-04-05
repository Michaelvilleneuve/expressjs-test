const logParams = (req, res, next) => {
  console.info('---');
  console.info('\x1b[36m%s\x1b[0m', JSON.stringify(req.parameters.all()));
  console.info('---');
  next();
};

export default logParams;
