/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  /*
   test('#example Test GET /api/books', function (done) {
     chai.request(server)
       .get('/api/books')
       .end(function (err, res) {
         assert.equal(res.status, 200);
         assert.isArray(res.body, 'response should be an array');
         assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
         assert.property(res.body[0], 'title', 'Books in array should contain title');
         assert.property(res.body[0], '_id', 'Books in array should contain _id');
         done();
       });
   });
   /*
   * ----[END of EXAMPLE TEST]----
   */

  suite('Routing tests', function () {


    suite('POST /api/books with title => create book object/expect book object', function () {

      test('Test POST /api/books with title', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - post with title'
          })
          .end(function (err, res) {

            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'Title - post with title');
            assert.isString(res.body._id);
            done();
          });
      });

      test('Test POST /api/books with no title given', function (done) {
        chai.request(server)
          .post('/api/books')
          .end(function (err, res) {

            //assert.equal(res.status, 400);
            assert.equal(res.status, 200);
            done();
          });
      });

    });


    suite('GET /api/books => array of books', function () {

      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get('/api/books')
          .end(function (err, res) {

            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], '_id');
            assert.property(res.body[0], 'title');
            assert.property(res.body[0], 'commentcount');
            assert.isNumber(res.body[0].commentcount);
            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        var _id = 'invalid-id'

        chai.request(server)
          .get(`/api/books/${_id}`)
          .end(function (err, res) {

            //assert.equal(res.status, 400);
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid bookid');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - get with valid id'
          })
          .end(function (err, res) {
            var validid = res.body._id;

            chai.request(server)
              .get(`/api/books/${validid}`)
              .end(function (err, res) {

                assert.equal(res.status, 200);
                assert.equal(res.body.title, 'Title - get with valid id');
                assert.equal(res.body._id, validid);
                assert.isArray(res.body.comments);
                done();
              });
          });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {

      test('Test POST /api/books/[id] with comment', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - with comment'
          })
          .end(function (err, res) {
            var whitcommentid = res.body._id;
            var comment = "some comment";

            chai.request(server)
              .post(`/api/books/${whitcommentid}`)
              .send({
                comment
              })
              .end(function (err, res) {

                chai.request(server)
                  .get(`/api/books/${whitcommentid}`)
                  .end(function (err, res) {

                    assert.equal(res.status, 200);
                    assert.equal(res.body.title, 'Title - with comment');
                    assert.equal(res.body._id, whitcommentid);
                    assert.isArray(res.body.comments);
                    assert.equal(res.body.comments[0], comment);
                    done();
                  });
              });
          });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - with comment'
          })
          .end(function (err, res) {
            var whitoutcommentid = res.body._id;

            chai.request(server)
              .post(`/api/books/${whitoutcommentid}`)
              .send({})
              .end(function (err, res) {
                assert.equal(res.text, 'missing required field comment');
                done();
              });
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - with comment'
          })
          .end(function (err, res) {
            var notindbid = 'not-in-db-id';
            var comment = "some comment";

            chai.request(server)
              .post(`/api/books/${notindbid}`)
              .send({
                comment
              })
              .end(function (err, res) {
                assert.equal(res.text, 'no book exists');
                done();
              });
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {

      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - with comment'
          })
          .end(function (err, res) {
            var _id = res.body._id;

            chai.request(server)
              .delete(`/api/books/${_id}`)
              .end(function (err, res) {
                assert.equal(res.text, 'delete successful');
                done();
              });
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: 'Title - with comment'
          })
          .end(function (err, res) {
            var notindbid = 'not-in-db-id';

            chai.request(server)
              .delete(`/api/books/${notindbid}`)
              .end(function (err, res) {
                assert.equal(res.text, 'no book exists');
                done();
              });
          });
      });

    });

  });

});
