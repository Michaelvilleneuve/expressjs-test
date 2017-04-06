import User from './model';
import service from './service';
import { expect } from 'chai';

describe('User service', () => {
  describe('"Index"', () => {
    it('should export a function', () => {
      expect(service.index).to.be.a('function');
    })
  })
})
