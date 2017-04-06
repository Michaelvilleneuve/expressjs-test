import chai,{ expect } from 'chai'; // eslint-disable-line
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

describe('User service', () => {
  describe('Index', () => {
    it('should return 401', (done) => {
      chai.request(app)
          .get('/api/users')
          .end((err, res) => {
              expect(res).to.have.status(401);
              done();
          });
    });
  });
});
