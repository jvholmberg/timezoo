var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Routes', function() {
  it('Check landing page', function(done) {
    chai.request(server).get('/').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('Check register page', function(done) {
    chai.request(server).get('/register').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('Check login page', function(done) {
    chai.request(server).get('/login').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('Check dashboard page', function(done) {
    chai.request(server).get('/dashboard').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('Check time page', function(done) {
    chai.request(server).get('/Test-1/time').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
