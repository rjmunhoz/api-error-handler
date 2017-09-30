
var error = require('http-errors');
var request = require('supertest');
var express = require('express');
var assert = require('assert');

var handler = require('..');

describe('API Error Handler', function () {
  it('5xx', function (done) {
    const app = express();
    app.use(function (req, res, next) {
      next(error(501, 'lol'));
    });
    app.use(handler({log: false}));

    request(app.listen())
    .get('/')
    .expect(501)
    .end(function (err, res) {
      assert.ifError(err);

      const body = res.body;
      assert.equal(body.message, 'Not Implemented');
      assert.equal(body.status, 501);
      done();
    })
  })

  it('4xx', function (done) {
    const app = express();
    app.use(function (req, res, next) {
      next(error(401, 'lol', {
        type: 'a',
        code: 'b'
      }));
    });
    app.use(handler({log: false}));

    request(app.listen())
    .get('/')
    .expect(401)
    .end(function (err, res) {
      assert.ifError(err);

      const body = res.body;
      assert.equal(body.message, 'lol');
      assert.equal(body.status, 401);
      assert.equal(body.type, 'a');
      assert.equal(body.code, 'b');
      done();
    })
  })

  it('Extra params', function(done) {
    const app = express()
    const extra = {testing: 'hey! it worked!'}
    app.use(function(req, res, next) {
      next(error(400, 'testing this', {extra}))
    })
    app.use(handler({log: false}))

    request(app.listen())
    .get('/')
    .expect(400)
    .end(function (err, res) {
      assert.ifError(err)

      const body = res.body
      assert.equal(body.testing, extra.testing)
      done()
    })
  })
})
